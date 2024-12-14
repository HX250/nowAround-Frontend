const fs = require("fs");
const path = require("path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";

const apiEndpoint = process.env.API_END_POINT;
const mapboxToken = process.env.MAPBOX_TOKEN;

if (!apiEndpoint || !mapboxToken) {
  console.error(
    "Environment variables API_END_POINT or MAPBOX_TOKEN are missing!",
  );
  process.exit(1);
}

const envFile = `export const environment = {
    API_END_POINT: '${apiEndpoint}',
    MAPBOX_TOKEN: '${mapboxToken}',
};
`;

const targetPath = path.join(
  __dirname,
  "./src/environments/environment.prod.ts",
);
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(
    successColor,
    `${checkSign} Successfully generated environment.prod.ts`,
  );
});
