import cache from "../cache/connRedis.js";
import redis from "../cache/funcRedis.js";
const { setRedis, getRedis } = redis;
import pools from "../database/connDB.js";
import funcDB from "../database/funcDB.js";
const { newUrl, updateClicks, getAllUrl, getUrl, deleteUrl } = funcDB;
import { checkDB as checkPrefixDB } from "./dbPrefixSharding.js";
import { checkDB as checkRangeDB } from "./dbRangeSharding";

import crypto from "crypto";
import { stringToBase62 } from "../utils/stringToBase62.js";
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);

const KEY_LENGTH = 7;

//ask lily---------------------wait to confirm
async function getCryptoID() {
  const rawBytes = await randomBytes(KEY_LENGTH);
  return rawBytes.toString("hex");
}
async function getCacheURL(short) {
  const idxDB = 0;
  // const idxDB = checkPrefixDB(short);
  // const idxDB = checkRangeDB(short);
  const cache = await getRedis(idxDB);
  if (cache) {
    console.log(`get DB-${idxDB} ${short} cache!`);
    return cache.find((obj) => obj.shorts === short);
  } else {
    const conn = await pools[idxDB].getConnection();
    const urls = await getAllUrl(conn);
    setRedis(idxDB, urls, 24 * 60 * 60 * 3); //3 days
    console.log(`get DB-${idxDB} ${short} db!`);
    return urls.find((obj) => obj.shorts === short);
  }
}
async function cacheSetClicks(short, clicks) {
  const idxDB = 0;
  // const idxDB = checkPrefixDB(short);
  // const idxDB = checkRangeDB(short);
  const cache = await getRedis(idxDB);
  const obj = cache.find((obj) => obj.shorts === short);
  obj.clicks = clicks;
  setRedis(idxDB, urls, 24 * 60 * 60 * 3);
  //when update to db?
}

export default { getCryptoID, getCacheURL, cacheSetClicks };
