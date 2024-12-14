const fs = require("fs");
const prodEnvPath = "./src/environments/environment.prod.ts";

const backendApiUrl = process.env.BACKEND_API_URL;
const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

const content = fs
  .readFileSync(prodEnvPath, "utf-8")
  .replace("YOUR_BACKEND_API_URL", backendApiUrl)
  .replace("YOUR_MAPBOX_ACCESS_TOKEN", mapboxAccessToken);

fs.writeFileSync(prodEnvPath, content);
