// Checks if our MONGO_URI is valid (string) or undefined (not found, missing or wrong uri)
const getEnv = (key: string, defaultValue?: string): string =>{
  const value = process.env[key] || defaultValue;

  if(value === undefined){
    throw new Error(`Missing Environment Variable ${key}`)
  }
  return value;
}

export const MONGO_URI = getEnv("MONGO_URI");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "4000");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const RESEND_API_KEY = getEnv("RESEND_API_KEY")
export const EMAIL_SENDER = getEnv("EMAIL_SENDER")
export const SMTP_HOST = getEnv("SMTP_HOST");
export const SMTP_PORT = getEnv("SMTP_PORT");
export const SMTP_EMAIL = getEnv("SMTP_EMAIL");
export const SMTP_PASSWORD = getEnv("SMTP_PASSWORD");
export const SMTP_FROM_NAME = getEnv("SMTP_FROM_NAME");
export const SMTP_FROM_EMAIL = getEnv("SMTP_FROM_EMAIL");