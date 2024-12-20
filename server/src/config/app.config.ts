export const AppConfig = () => ({
  port: parseInt(process.env.PORT) || 3000,
  environment: process.env.ENVIRONMENT || "DEVELOPMENT",
  jwtSecret: process.env.JWT_SECRET || "urna",
  salts: parseInt(process.env.SALTS) || 5,
});
