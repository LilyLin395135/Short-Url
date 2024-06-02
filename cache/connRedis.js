import redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const configRedis = [
  {
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times) => retryConn(times)
  }
  // {
  //   host: process.env.CACHE_HOST_1,
  //   port: process.env.CACHE_USER_1,
  //   password: process.env.CACHE_PASSWORD_1,
  //   retryStrategy: (times) => retryConn(times)
  // },
  // {
  //   host: process.env.CACHE_HOST_2,
  //   port: process.env.CACHE_USER_2,
  //   password: process.env.CACHE_PASSWORD_2,
  //   retryStrategy: (times) => retryConn(times)
  // }
];
function retryConn(times) {
  if (times % 4 == 0) {
    console.error("Redis error: reconnect exhausted after 3 retries.");
    return null;
  }
  return 200;
}

const connections = configRedis.map((config) => new redis(config));

export default connections;
