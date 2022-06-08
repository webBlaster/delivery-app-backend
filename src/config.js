require("dotenv").config();
const redis = require("redis");

//redis config
//Redis Client
const RedisClient = redis.createClient({ url: process.env.REDIS_URL });
try {
  RedisClient.connect();
} catch (error) {
  console.log(error);
}

RedisClient.on("error", (e) => {
  console.log("Redis ready", e);
});

module.exports = RedisClient;
