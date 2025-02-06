import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string(),
  DATABASE_URL: z.string(),
  LOG_LEVEL: z.string().default('info'),
});

export default envSchema.parse(process.env);