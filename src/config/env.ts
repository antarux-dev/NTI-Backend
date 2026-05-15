import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ 
    quiet: true 
});

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.coerce.number().default(3000)
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error('Invalid env variables:');
    console.error(z.treeifyError(parsedEnv.error));
    process.exit(1);
}

export const env = parsedEnv.data;
export const isProduction = env.NODE_ENV === 'production';
