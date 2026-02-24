import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js"; // uses our validated config!
import dns from "node:dns";
import mapRoutes from "./routes/map.ts";
import roleRoutes from "./routes/roles.ts";

const app = express();

app.use(cors({ origin: env.CLIENT_URL }));
app.use(express.json());
app.use(mapRoutes);
app.use(roleRoutes);

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Routes will be added here in D4-T4

app.listen(env.PORT, async () => {
  await connectDB(env.MONGODB_URI);
  console.log(`🚀 Server running on port ${env.PORT}`);
});
