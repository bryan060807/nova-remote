// server/config.js — Environment loader & validator for Nova Remote backend

import dotenv from 'dotenv';
import Joi from 'joi';

// Load environment variables from .env file
dotenv.config();

// Define schema for validation
const envSchema = Joi.object({
  PORT: Joi.number().default(5000),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
  TV_IP: Joi.string().ip({ version: ['ipv4', 'ipv6'] }).required(),
  TV_NAME: Joi.string().default('LG_WebOS_TV'),
  CORS_ORIGIN: Joi.string()
    .default('http://localhost:5173,https://nova-remote.vercel.app')
    .description('Comma-separated list of allowed origins'),
  API_SECRET: Joi.string().min(12).default('change-this-secret'),
  TV_API_BASE: Joi.string().uri({ scheme: [/https?/] }).optional(),
  API_TIMEOUT: Joi.number().min(1000).max(30000).default(5000),
  ENABLE_DEBUG: Joi.boolean().truthy('true').falsy('false').default(false),
}).unknown(); // Allow extra env vars

// Validate the environment variables
const { value: env, error } = envSchema.validate(process.env, {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});

if (error) {
  console.error('❌ Invalid environment configuration:', error.details.map(e => e.message).join(', '));
  process.exit(1);
}

// Normalize allowed origins as an array
const allowedOrigins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim());

export default {
  port: env.PORT,
  nodeEnv: env.NODE_ENV,
  logLevel: env.LOG_LEVEL,
  tvIp: env.TV_IP,
  tvName: env.TV_NAME,
  corsOrigin: allowedOrigins,
  apiSecret: env.API_SECRET,
  tvApiBase: env.TV_API_BASE || `http://${env.TV_IP}:3000`,
  apiTimeout: env.API_TIMEOUT,
  debug: env.ENABLE_DEBUG,
};
