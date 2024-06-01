async function newUrl(conn, longs, shorts) {
  const [rows] = await conn.query(
    `
        INSERT INTO \`urls\` (longs, shorts)
        VALUES (?,?)
    `,
    [longs, shorts]
  );
  try {
    // console.log("insert rows %j", rows);
    // {"fieldCount":0,"affectedRows":1,"insertId":3,"info":"","serverStatus":2,"warningStatus":0,"changedRows":0}
    return rows.insertId;
  } catch (err) {
    console.log(err);
    return undefined; //or throw error directly?
  }
}
async function updateClicks(conn, shorts, clicks) {
  const [rows] = await conn.query(
    `
        UPDATE \`urls\`
        SET clicks = ?
        WHERE shorts = ?
    `,
    [clicks, shorts]
  );
  try {
    //console.log("update rows %j", rows);
    //{"fieldCount":0,"affectedRows":1,"insertId":0,"info":"Rows matched: 1  Changed: 1  Warnings: 0","serverStatus":2,"warningStatus":0,"changedRows":1}
    return rows.changedRows;
  } catch (err) {
    console.log(err);
    return undefined; //or throw error directly?
  }
}
async function getUrl(conn, start, pageSize, search = "") {
  let condition = search == "" ? "" : ` WHERE longs LIKE '%${search}%'`;
  const [rows] = await conn.query(
    `
        SELECT id,longs,shorts,clicks
        FROM urls
        ${condition}
        LIMIT ?, ?;
    `,
    [start, pageSize]
  );
  try {
    // console.log("select rows %j", rows);
    //[{"id":4,"longs":"https://blog.medium.com/bnp-editors-9c0a6f5a133a","shorts":"https://www.example.com/2","clicks":0}]
    return rows;
  } catch (err) {
    console.log(err);
    return undefined; //or throw error directly?
  }
}
async function deleteUrl(conn, shorts) {
  const [rows] = await conn.query(
    `
        DELETE FROM urls
        WHERE shorts = ?
    `,
    [shorts]
  );
  try {
    // console.log("delete rows %j", rows);
    // {"fieldCount":0,"affectedRows":1,"insertId":0,"info":"","serverStatus":2,"warningStatus":0,"changedRows":0}
    return rows.insertId;
  } catch (err) {
    console.log(err);
    return undefined; //or throw error directly?
  }
}

export default {
  newUrl,
  updateClicks,
  getUrl,
  deleteUrl
};
