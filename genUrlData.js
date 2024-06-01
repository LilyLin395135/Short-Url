import connections from "./database/connDB.js";
import funcDB from "./database/funcDB.js";
const { newUrl, updateClicks, getUrl, deleteUrl } = funcDB;

const pool = connections[0];
const DATA_NUMBER = 2;

async function createUrlTable() {
  const urlTable = await pool.query(
    `CREATE TABLE IF NOT EXISTS \`urls\`  (
        \`id\` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
        \`longs\` TEXT NOT NULL COMMENT 'Long URL',
        \`shorts\` VARCHAR(760) NULL COMMENT 'Short URL',
        \`clicks\` BIGINT NOT NULL DEFAULT 0 COMMENT 'Clicks Count',
        \`timestamp\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT shorts_unique UNIQUE (shorts) 
    );`
  );
  if (urlTable) console.log("urlTable is ready for service.");
}

async function genNewData() {
  const conn = await pool.getConnection();
  await createUrlTable();
  for (let i = 0; i < DATA_NUMBER; i++) {
    const idx = i % longs.length;
    await newUrl(conn, longs[idx], `https://www.example.com/${i + 1}`);
  }
  console.log("end");
}
async function updateData() {
  const conn = await pool.getConnection();
  await createUrlTable();
  await updateClicks(conn, "https://www.example.com/1", 1000);
  console.log("end");
}
async function getData() {
  const conn = await pool.getConnection();
  await createUrlTable();
  await getUrl(conn, 0, 6, "blog");
  console.log("end");
}
async function deleteData() {
  const conn = await pool.getConnection();
  await createUrlTable();
  deleteUrl(conn, "https://www.example.com/1");
  console.log("end");
}
// genNewData();
// updateData();
// getData();
deleteData();

const longs = [
  "https://wordpress.com/zh-tw/support/com-vs-org/#overview-of-differences",
  "https://blog.medium.com/bnp-editors-9c0a6f5a133a",
  "https://ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#Instances:instanceState=running",
  "https://ap-southeast-2.console.aws.amazon.com/s3/home?region=ap-southeast-2",
  "https://ap-southeast-2.console.aws.amazon.com/rds/home?region=ap-southeast-2",
  "https://us-east-1.console.aws.amazon.com/cloudfront/v4/home?region=ap-southeast-2",
  "https://us-east-1.console.aws.amazon.com/route53/v2/home?region=ap-southeast-2#",
  "https://us-east-1.console.aws.amazon.com/iam/home?region=ap-southeast-2#/home",
  "https://ap-southeast-2.console.aws.amazon.com/vpcconsole/home?region=ap-southeast-2#",
  "https://ap-southeast-2.console.aws.amazon.com/elasticache/home?region=ap-southeast-2#/",
  "https://ap-southeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-southeast-2",
  "https://support.console.aws.amazon.com/support/home?region=ap-southeast-2#/",
  "https://www.google.com/search?sca_esv=361416631b2a74db&q=dog&uds=ADvngMgHgC5Yh6HuuW7jYLKMdID8baR3UZPFZpUxrdbcRNc9B2ug1qX9Q2N0sM3KrCa8HyCmprvx0jaAurB1AEci1iIL0FtNyyo9OFtukwNGqCu0CVc-npfo8uglwDlZ5h3k-bprQugDNvN3eDvN88lmQG3NzR3cs1rfsAlxj6BV81mXLjQVAkIcjPQV1ohbXcX5KyyFIghIDcQRlF0GhCDF0_YHGKUFc85GpUAkoW5sYxo31XcVUfTb_xzpeG4ITXSbKqb81R9v&udm=2&prmd=ivsnmbtz&sa=X&ved=2ahUKEwjtjdajkbiGAxU7ma8BHWb-PDwQtKgLegQIDBAB&biw=1480&bih=717&dpr=1.25#vhid=MadgLdQ_K-avUM&vssid=mosaic",
  "https://www.google.com/search?sca_esv=361416631b2a74db&q=dog&uds=ADvngMgHgC5Yh6HuuW7jYLKMdID8baR3UZPFZpUxrdbcRNc9B2ug1qX9Q2N0sM3KrCa8HyCmprvx0jaAurB1AEci1iIL0FtNyyo9OFtukwNGqCu0CVc-npfo8uglwDlZ5h3k-bprQugDNvN3eDvN88lmQG3NzR3cs1rfsAlxj6BV81mXLjQVAkIcjPQV1ohbXcX5KyyFIghIDcQRlF0GhCDF0_YHGKUFc85GpUAkoW5sYxo31XcVUfTb_xzpeG4ITXSbKqb81R9v&udm=2&prmd=ivsnmbtz&sa=X&ved=2ahUKEwjtjdajkbiGAxU7ma8BHWb-PDwQtKgLegQIDBAB&biw=1480&bih=717&dpr=1.25#vhid=PpmCvrB3OtU3hM&vssid=mosaic",
  "https://www.google.com/search?sca_esv=361416631b2a74db&q=dog&uds=ADvngMgHgC5Yh6HuuW7jYLKMdID8baR3UZPFZpUxrdbcRNc9B2ug1qX9Q2N0sM3KrCa8HyCmprvx0jaAurB1AEci1iIL0FtNyyo9OFtukwNGqCu0CVc-npfo8uglwDlZ5h3k-bprQugDNvN3eDvN88lmQG3NzR3cs1rfsAlxj6BV81mXLjQVAkIcjPQV1ohbXcX5KyyFIghIDcQRlF0GhCDF0_YHGKUFc85GpUAkoW5sYxo31XcVUfTb_xzpeG4ITXSbKqb81R9v&udm=2&prmd=ivsnmbtz&sa=X&ved=2ahUKEwjtjdajkbiGAxU7ma8BHWb-PDwQtKgLegQIDBAB&biw=1480&bih=717&dpr=1.25#vhid=vEgZce8uNit9PM&vssid=mosaic",
  "https://www.google.com/search?sca_esv=361416631b2a74db&q=dog&uds=ADvngMgHgC5Yh6HuuW7jYLKMdID8baR3UZPFZpUxrdbcRNc9B2ug1qX9Q2N0sM3KrCa8HyCmprvx0jaAurB1AEci1iIL0FtNyyo9OFtukwNGqCu0CVc-npfo8uglwDlZ5h3k-bprQugDNvN3eDvN88lmQG3NzR3cs1rfsAlxj6BV81mXLjQVAkIcjPQV1ohbXcX5KyyFIghIDcQRlF0GhCDF0_YHGKUFc85GpUAkoW5sYxo31XcVUfTb_xzpeG4ITXSbKqb81R9v&udm=2&prmd=ivsnmbtz&sa=X&ved=2ahUKEwjtjdajkbiGAxU7ma8BHWb-PDwQtKgLegQIDBAB&biw=1480&bih=717&dpr=1.25#vhid=mrDsmJatPc7cSM&vssid=mosaic"
];
