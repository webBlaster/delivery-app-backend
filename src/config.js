//redis config
//Redis Client
const RedisClient = redis.createClient(process.env.REDIS_URL);

RedisClient.on("error", (e) => {
  debug("Redis ready", e);
});

module.exports = RedisClient;
