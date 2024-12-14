const fs = require("fs");

const apiEndpoint = process.env.API_END_POINT || "";
const mapboxToken = process.env.MAPBOX_TOKEN || "";

const envConfigFile = `
export const environment = {
    production: true,
    API_END_POINT: '${apiEndpoint}',
    MAPBOX_TOKEN: '${mapboxToken}',
};
`;

fs.writeFileSync(
  "./src/environments/environment.prod.ts",
  envConfigFile,
  "utf8",
);
console.log("Environment variables written successfully!");
