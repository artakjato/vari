import { Router } from 'express';
import { Role } from '../models/Role.js';
import { fetchScbRoleSalary } from '../services/scbSalary.js';

const router = Router();

router.get('/api/salaries/:slug', async (req, res) => {
	try {
		const role = await Role.findOne({ slug: req.params.slug })
			.select('slug name industrySlug')
			.lean();

		if (!role) {
			return res.status(404).json({ error: 'Role not found' });
		}

		const sectorCode = typeof req.query.sectorCode === 'string' ? req.query.sectorCode : null;
		const year = typeof req.query.year === 'string' ? req.query.year : null;

		try {
			const salaryArgs = {
				roleSlug: role.slug,
				roleName: role.name,
				industrySlug: role.industrySlug,
				...(sectorCode ? { sectorCode } : {}),
				...(year ? { year } : {}),
			};

			const live = await fetchScbRoleSalary({
				...salaryArgs,
			});

			return res.json({
				...live,
				roleSlug: role.slug,
				roleName: role.name,
			});
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to fetch SCB salary';

			return res.json({
				tableId: 'TAB5709',
				source: 'SCB',
				live: false,
				roleSlug: role.slug,
				roleName: role.name,
				occupationCode: null,
				occupationLabel: null,
				sectorCode: sectorCode,
				sectorLabel: null,
				year: year,
				averageMonthly: null,
				median: null,
				p25: null,
				p75: null,
				error: message,
			});
		}
	} catch {
		return res.status(500).json({ error: 'Failed to resolve salary' });
	}
});

export default router;
