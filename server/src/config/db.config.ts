export const DatabaseConfig = () => ({
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/urna",
  },
  redis: {
    uri: process.env.REDIS_URI || "redis://127.0.0.1:6379",
  },
});
