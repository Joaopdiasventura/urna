export const AppConfig = () => ({
  port: parseInt(process.env.PORT) || 3000,
  environment: process.env.ENVIRONMENT || 'DEVELOPMENT',
});
