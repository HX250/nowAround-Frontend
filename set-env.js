const fs = require("fs");
const prodEnvPath = "./src/environments/environment.prod.ts";

const backendApiUrl = process.env.BACKEND_API_URL;
const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

const content = fs
  .readFileSync(prodEnvPath, "utf-8")
  .replace("API_END_POINT", backendApiUrl)
  .replace("MAPBOX_TOKEN", mapboxAccessToken);

fs.writeFileSync(prodEnvPath, content);
