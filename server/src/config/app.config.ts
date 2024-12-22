export const AppConfig = () => ({
  port: parseInt(process.env.PORT) || 3000,
  environment: process.env.ENVIRONMENT || "DEVELOPMENT",
  jwtSecret: process.env.JWT_SECRET || "urna",
  salts: parseInt(process.env.SALTS) || 5,
  url: process.env.URL || "http://localhost:3000",
  email: {
    address: process.env.EMAIL_ADDRESS,
    password: process.env.EMAIL_PASSWORD,
  },
});
