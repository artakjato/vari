const SCB_TABLE_ID = 'TAB5709';
const SCB_BASE_URL = `https://statistikdatabasen.scb.se/api/v2/tables/${SCB_TABLE_ID}`;
const DEFAULT_SECTOR_CODE = '0';
const DEFAULT_SEX_CODE = '1+2';

const SCB_MONTHLY_SALARY_CODE = '000007AW';
const SCB_MEDIAN_CODE = '000007AX';
const SCB_P25_CODE = '000007AZ';
const SCB_P75_CODE = '000007B0';

const METADATA_TTL_MS = 12 * 60 * 60 * 1000;
const METRIC_TTL_MS = 6 * 60 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 12000;

type StringMap = Record<string, string>;

interface ScbMetadataCache {
	fetchedAt: number;
	latestYear: string;
	availableYears: string[];
	occupationLabels: StringMap;
	sectorLabels: StringMap;
}

interface ScbRoleSalaryArgs {
	roleSlug: string;
	roleName: string;
	industrySlug?: string;
	sectorCode?: string;
	year?: string;
}

export interface ScbRoleSalaryResult {
	tableId: string;
	source: string;
	live: boolean;
	occupationCode: string;
	occupationLabel: string;
	sectorCode: string;
	sectorLabel: string;
	year: string;
	averageMonthly: number | null;
	median: number | null;
	p25: number | null;
	p75: number | null;
}

const ROLE_OCCUPATION_CODE_MAP: Record<string, string> = {
	'fullstack-engineer': '251',
	'full-stack-engineer': '251',
	'frontend-engineer': '251',
	'backend-engineer': '251',
	'ios-developer': '251',
	'android-developer': '251',
	'ml-engineer': '212',
	'devops-engineer': '251',
	'security-analyst': '351',
	'gameplay-engineer': '251',
	'engine-programmer': '251',
	'online-systems-engineer': '251',
	'site-reliability-engineer': '251',
	'platform-engineer': '251',
	'cloud-devops-engineer': '251',
	'firmware-engineer': '214',
	'embedded-software-engineer': '214',
	'iot-engineer': '214',
};

const metadataCache: { value: ScbMetadataCache | null } = { value: null };
const metricCache = new Map<string, { value: number | null; expiresAt: number }>();

function toStringMap(input: unknown): StringMap {
	if (!input || typeof input !== 'object') return {};

	const output: StringMap = {};
	for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
		if (typeof value === 'string') {
			output[key] = value;
		}
	}
	return output;
}

function findLatestYear(years: string[]): string {
	const numericYears = years
		.map((value) => Number(value))
		.filter((value) => Number.isFinite(value));

	if (!numericYears.length) {
		return String(new Date().getUTCFullYear() - 1);
	}

	return String(Math.max(...numericYears));
}

function normalizeRoleName(value: string): string {
	return value.toLowerCase();
}

function resolveOccupationCode(roleSlug: string, roleName: string, industrySlug?: string): string {
	const direct = ROLE_OCCUPATION_CODE_MAP[roleSlug];
	if (direct) return direct;

	const normalizedRole = normalizeRoleName(roleName);
	if (normalizedRole.includes('machine learning') || normalizedRole.includes('data scientist')) return '212';
	if (normalizedRole.includes('security')) return '351';
	if (normalizedRole.includes('firmware') || normalizedRole.includes('embedded') || normalizedRole.includes('iot')) return '214';

	if (industrySlug === 'data-ai') return '212';
	if (industrySlug === 'embedded-systems') return '214';
	if (industrySlug === 'cybersecurity') return '351';

	return '251';
}

function parsePxDataValue(pxRaw: string): number | null {
	const match = pxRaw.match(/DATA=\s*([\s\S]*?);/i);
	if (!match) return null;

	const dataBlock = match[1]?.replace(/\r?\n/g, ' ').trim();
	if (!dataBlock) return null;

	const firstToken = dataBlock.split(/\s+/)[0];
	if (!firstToken || firstToken === '..' || firstToken === '.') return null;

	const numeric = Number(firstToken.replace(',', '.'));
	return Number.isFinite(numeric) ? numeric : null;
}

function withTimeoutSignal(timeoutMs: number): AbortSignal {
	const controller = new AbortController();
	setTimeout(() => controller.abort(), timeoutMs);
	return controller.signal;
}

async function fetchScbMetadata(): Promise<ScbMetadataCache> {
	const cached = metadataCache.value;
	if (cached && Date.now() - cached.fetchedAt < METADATA_TTL_MS) {
		return cached;
	}

	const response = await fetch(`${SCB_BASE_URL}/metadata?lang=en`, {
		method: 'GET',
		signal: withTimeoutSignal(REQUEST_TIMEOUT_MS),
	});

	if (!response.ok) {
		throw new Error(`SCB metadata request failed (${response.status})`);
	}

	const metadata = (await response.json()) as {
		dimension?: {
			Tid?: { category?: { label?: unknown } };
			Yrkesgrupp12?: { category?: { label?: unknown } };
			Sektor?: { category?: { label?: unknown } };
		};
	};

	const yearLabels = toStringMap(metadata.dimension?.Tid?.category?.label);
	const availableYears = Object.keys(yearLabels);
	const latestYear = findLatestYear(availableYears);

	const occupationLabels = toStringMap(metadata.dimension?.Yrkesgrupp12?.category?.label);
	const sectorLabels = toStringMap(metadata.dimension?.Sektor?.category?.label);

	const next: ScbMetadataCache = {
		fetchedAt: Date.now(),
		latestYear,
		availableYears,
		occupationLabels,
		sectorLabels,
	};

	metadataCache.value = next;
	return next;
}

async function fetchScbMetric(args: {
	occupationCode: string;
	sectorCode: string;
	year: string;
	metricCode: string;
}): Promise<number | null> {
	const cacheKey = `${args.occupationCode}|${args.sectorCode}|${args.year}|${args.metricCode}`;
	const cached = metricCache.get(cacheKey);
	if (cached && cached.expiresAt > Date.now()) {
		return cached.value;
	}

	const payload = {
		Selection: [
			{ VariableCode: 'Sektor', ValueCodes: [args.sectorCode] },
			{ VariableCode: 'Yrkesgrupp12', ValueCodes: [args.occupationCode] },
			{ VariableCode: 'Kon', ValueCodes: [DEFAULT_SEX_CODE] },
			{ VariableCode: 'ContentsCode', ValueCodes: [args.metricCode] },
			{ VariableCode: 'Tid', ValueCodes: [args.year] },
		],
		outputFormat: 'px',
	};

	const response = await fetch(`${SCB_BASE_URL}/data?lang=en`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(payload),
		signal: withTimeoutSignal(REQUEST_TIMEOUT_MS),
	});

	if (!response.ok) {
		throw new Error(`SCB data request failed (${response.status})`);
	}

	const raw = await response.text();
	const value = parsePxDataValue(raw);
	metricCache.set(cacheKey, { value, expiresAt: Date.now() + METRIC_TTL_MS });
	return value;
}

export async function fetchScbRoleSalary(args: ScbRoleSalaryArgs): Promise<ScbRoleSalaryResult> {
	const metadata = await fetchScbMetadata();
	const occupationCode = resolveOccupationCode(args.roleSlug, args.roleName, args.industrySlug);

	const sectorCode =
		args.sectorCode && metadata.sectorLabels[args.sectorCode] ? args.sectorCode : DEFAULT_SECTOR_CODE;
	const year =
		args.year && metadata.availableYears.includes(args.year) ? args.year : metadata.latestYear;

	const [averageMonthly, median, p25, p75] = await Promise.all([
		fetchScbMetric({
			occupationCode,
			sectorCode,
			year,
			metricCode: SCB_MONTHLY_SALARY_CODE,
		}),
		fetchScbMetric({
			occupationCode,
			sectorCode,
			year,
			metricCode: SCB_MEDIAN_CODE,
		}),
		fetchScbMetric({
			occupationCode,
			sectorCode,
			year,
			metricCode: SCB_P25_CODE,
		}),
		fetchScbMetric({
			occupationCode,
			sectorCode,
			year,
			metricCode: SCB_P75_CODE,
		}),
	]);

	return {
		tableId: SCB_TABLE_ID,
		source: 'SCB',
		live: true,
		occupationCode,
		occupationLabel: metadata.occupationLabels[occupationCode] ?? occupationCode,
		sectorCode,
		sectorLabel: metadata.sectorLabels[sectorCode] ?? sectorCode,
		year,
		averageMonthly,
		median,
		p25,
		p75,
	};
}
