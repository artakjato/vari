import { Router } from "express";
import { fetchLiveJobCount } from "../services/jobtech.js";

const router = Router();

router.get("/api/jobs/:roleSlug", async (req, res) => {
  try {
    const { roleSlug } = req.params;
    const jobData = await fetchLiveJobCount(roleSlug);

    if (jobData) {
      res.json(jobData);
    } else {
      res.status(404).json({ error: "Job data not found" });
    }
  } catch (error) {
    console.error("Error in /api/jobs/:roleSlug route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
