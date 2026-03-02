
type JobData = { count: number; regions: { Stockholm: number; Göteborg: number; Malmö: number; Övriga: number } };
const cache: Record<string, { data: JobData; expiry: number }> = {};
const CACHE_TTL_MS = 15 * 60 * 1000;

const jobQueries: Record<string, string> = {
  "fullstack-engineer": "fullstack",
  "frontend-engineer": "frontend",
  "backend-engineer": "backend",
  "ios-developer": "ios",
  "android-developer": "android",
  "ml-engineer": "machine learning",
  "devops-engineer": "devops",
  "security-analyst": "it-säkerhet",
  "gameplay-engineer": "spelutvecklare",
  "engine-programmer": "grafikprogrammerare",
  "online-systems-engineer": "online engineer",
  "site-reliability-engineer": "sre",
  "platform-engineer": "platform engineer",
  "cloud-devops-engineer": "cloud devops",
  "firmware-engineer": "firmware",
  "embedded-software-engineer": "embedded",
  "iot-engineer": "iot",
};

export async function fetchLiveJobCount(roleSlug: string): Promise<JobData | null> {

  const cached = cache[roleSlug];
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }

  const fallbackQuery = roleSlug.replace(/-/g, " ") + " OR utvecklare";
  const baseQuery = jobQueries[roleSlug] || fallbackQuery;

  const executeQuery = async (queryStr: string): Promise<number> => {
    const url = `https://jobsearch.api.jobtechdev.se/search?q=${encodeURIComponent(queryStr)}&limit=0`;
    try {
      const response = await fetch(url, { headers: { "accept": "application/json" } });
      if (!response.ok) return 0;
      const data = await response.json();
      return data?.positions || data?.total?.value || 0;
    } catch {
      return 0;
    }
  };

  try {
    const [total, stockholm, goteborg, malmo] = await Promise.all([
      executeQuery(baseQuery),
      executeQuery(`${baseQuery} stockholm`),
      executeQuery(`${baseQuery} göteborg`),
      executeQuery(`${baseQuery} malmö`),
    ]);

    const rawOvriga = total - (stockholm + goteborg + malmo);
    const ovriga = Math.max(0, rawOvriga);

    const result = {
      count: total,
      regions: {
        Stockholm: stockholm,
        Göteborg: goteborg,
        Malmö: malmo,
        Övriga: ovriga
      }
    };

    cache[roleSlug] = {
      data: result,
      expiry: Date.now() + CACHE_TTL_MS
    };

    return result;
  } catch (err) {
    console.error("Failed to fetch jobs from JobTech API:", err);
    return null;
  }
}
