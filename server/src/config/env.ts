import dotenv from 'dotenv';
dotenv.config();

const requiredVars = ['MONGODB_URI', 'JWT_SECRET'] as const;

for (const varName of requiredVars) {
  if (!process.env[varName]) {
    console.error(`❌ Missing required environment variable: ${varName}`);
    console.error(`   → Make sure it's set in server/.env`);
    process.exit(1);
  }
}

export const env = {
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  PORT: parseInt(process.env.PORT || '5000', 10),
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};