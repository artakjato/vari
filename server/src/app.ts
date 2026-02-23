import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import { env } from './config/env';  // uses our validated config!

const app = express();

app.use(cors({ origin: env.CLIENT_URL }));
app.use(express.json());

// Routes will be added here in D4-T4

app.listen(env.PORT, async () => {
  await connectDB(env.MONGODB_URI);
  console.log(`🚀 Server running on port ${env.PORT}`);
});