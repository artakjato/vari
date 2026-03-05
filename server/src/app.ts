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

const allowedOrigins = [
  env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
].map((origin) => origin.replace(/\/$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
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
