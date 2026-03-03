import cors from "cors";
import express from "express";
import dns from "node:dns";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import authRoutes from './routes/auth.js';
import jobsRoutes from './routes/jobs.js';
import mapRoutes from "./routes/map.js";
import pinRoutes from './routes/pins.js';
import roleRoutes from "./routes/roles.js";
import salaryRoutes from './routes/salary.js';
import searchRoutes from './routes/search.js';

const app = express();

app.use(cors({
  origin: [
    env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
  ]
}));
app.use(express.json());
app.use(mapRoutes);
app.use(roleRoutes);
app.use(salaryRoutes);
app.use(searchRoutes);
app.use(jobsRoutes);
app.use(authRoutes);
app.use(pinRoutes);

dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.listen(env.PORT, async () => {
  await connectDB(env.MONGODB_URI);
  console.log(`🚀 Server running on port ${env.PORT}`);
});
