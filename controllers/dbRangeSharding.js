import pools from "./database/connDB.js";
import funcDB from "./database/funcDB.js";
const { newUrl, updateClicks, getUrl, deleteUrl, countUrl } = funcDB;

//URL:500 bytes/ea
//RDS:20 GB * 1024^3 /500 => 42949673 urls
//Threshold: 50%          => 21474836 urls
const RDS_LIMIT = 20000000; //2*10^7
let DBs_STD = [];
let DBs_COUNT = [];

//因為 short  key 不重複，所以也不需要管 lock
async function dbRangeSharding(long, short) {
  const { index, value } = getShardingGroups(pools.length);
  const conn = await pools[index].getConnection();
  const newShort = value.toString() + short;
  const insertId = await newUrl(conn, long, newShort);
  DBs_COUNT[index]++;
  console.log(
    `db-${index} insert(${newShort}) as id(${insertId}) successfully.`
  );
  if (DBs_COUNT[index] > RDS_LIMIT) {
    console.log(`db-${index} is out of limit(${RDS_LIMIT}).`);
  }
  return index; //return db index
}

//缺點是沒有彈性，涉及每台 DB 負責的 range，不易變動
async function getShardingGroups(num) {
  if ((DBs_COUNT.length = 0)) {
    for (let i = 0; i < pools.length; i++) {
      const conn = await pools[i].getConnection();
      const count = await countUrl(conn);
      DBs_STD.push(RDS_LIMIT * (i + 1));
      DBs_COUNT.push(count);
    }
  }
  const value = Math.min(...DBs_COUNT);
  const index = DBs_COUNT.indexOf(value);
  const start = { index, value: DBs_STD[index] + value + 1 };
  return start;
}

async function checkDB(short) {
  const number = Number(short.substring(0, RDS_LIMIT.toString().length));
  for (let i = 0; i < pools.length; i++) {
    if (number > (i + 1) * RDS_LIMIT && number < (i + 2) * RDS_LIMIT) return i;
  }
  throw new Error(`${short} Error! Cannot find responding RangeSharding DB!`);
}

export default {
  dbRangeSharding,
  checkDB
};
