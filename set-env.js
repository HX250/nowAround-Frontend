const fs = require("fs");
const path = require("path");

const envFilePath = path.join(
  __dirname,
  "../src/environments/environment.prod.ts",
);

let fileContent = fs.readFileSync(envFilePath, "utf8");

fileContent = fileContent
  .replace("process.env.MAPBOX_TOKEN", `"${process.env.MAPBOX_TOKEN}"`)
  .replace("process.env.API_END_POINT", `"${process.env.API_END_POINT}"`);

fs.writeFileSync(envFilePath, fileContent, "utf8");

console.log("Environment variables injected into environment.prod.ts");
