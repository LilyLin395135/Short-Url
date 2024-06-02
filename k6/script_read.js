const http = require("k6/http");
const { check, sleep } = require("k6");

const url = "https://yvonnei.com/api/1.0/shortUrl?paging=0";
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
// test HTTP
export default function () {
  const res = http.get(url);
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}