const http = require("k6/http");
const { check, sleep } = require("k6");

//offcial link: https://k6.io/docs/using-k6/http-requests/

const url = "https://yvonnei.com/api/1.0/shortUrl";
export const options = {
  discardResponseBodies: true,
  insecureSkipTLSVerify: true,
  scenarios: {
    contacts: {
      executor: "constant-arrival-rate",
      rate: 20,
      timeUnit: "1s",
      duration: "20s",
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
};
const payload = JSON.stringify({
  longUrl:
    "https://www.google.com/search?sca_esv=361416631b2a74db&q=dog&uds=ADvngMgHgC5Yh6HuuW7jYLKMdID8baR3UZPFZpUxrdbcRNc9B2ug1qX9Q2N0sM3KrCa8HyCmprvx0jaAurB1AEci1iIL0FtNyyo9OFtukwNGqCu0CVc-npfo8uglwDlZ5h3k-bprQugDNvN3eDvN88lmQG3NzR3cs1rfsAlxj6BV81mXLjQVAkIcjPQV1ohbXcX5KyyFIghIDcQRlF0GhCDF0_YHGKUFc85GpUAkoW5sYxo31XcVUfTb_xzpeG4ITXSbKqb81R9v&udm=2&prmd=ivsnmbtz&sa=X&ved=2ahUKEwjtjdajkbiGAxU7ma8BHWb-PDwQtKgLegQIDBAB&biw=1480&bih=717&dpr=1.25#vhid=mrDsmJatPc7cSM&vssid=mosaic",
});
const params = {
  headers: {
    "Content-Type": "application/json",
  },
};
// test HTTP
export default function () {
  const res = http.post(url, payload, params);
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}