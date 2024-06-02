import getCryptoID from "./controllers/kgsCache.js";

const id = await getCryptoID();
const RDS_LIMIT = 20000000;
function getShardingGroups() {
  const DBs_COUNT = [123, 123, 200];

  const value = Math.min(...DBs_COUNT);
  const index = DBs_COUNT.indexOf(value);
  const start = { index, value: RDS_LIMIT + value + 1 };
  return start;
}

const { index, value } = getShardingGroups();
const newShort = value.toString() + id;
console.log(index);
console.log(newShort);

const arr = [];
for (let i = 0; i < 3; i++) {
  arr.push(i);
}
console.log(arr);
