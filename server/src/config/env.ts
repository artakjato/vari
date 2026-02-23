import dotenv from 'dotenv';
dotenv.config();

// List every environment variable your app requires
const requiredVars = ['MONGODB_URI', 'JWT_SECRET'] as const;

// Check each one exists and is not empty
for (const varName of requiredVars) {
  if (!process.env[varName]) {
    console.error(`❌ Missing required environment variable: ${varName}`);
    console.error(`   → Make sure it's set in server/.env`);
    process.exit(1);
  }
}

// Export typed config object so the rest of the app can import validated values
export const env = {
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  PORT: parseInt(process.env.PORT || '5000', 10),
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};