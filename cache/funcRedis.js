async function setRedis(key, value, expire = 0) {
  if (expire === 0) {
    return await redis.set(key, JSON.stringify(value));
  } else {
    //expire unit : seconds
    return await redis.set(key, JSON.stringify(value), "EX", expire);
  }
}
async function getRedis(key) {
  return JSON.parse(await redis.get(key));
}

async function deleteRedis(key) {
  return await redis.del(key);
}

export default {
  setRedis,
  getRedis,
  deleteRedis
};
