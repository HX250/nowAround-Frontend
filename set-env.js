const fs = require("fs");
const environmentFilePath = "./src/environments/environment.prod.ts";

const envConfigFile = `
export const environment = {
  production: true,
  MAPBOX_TOKEN: '${process.env.MAPBOX_TOKEN}',
  API_END_POINT: '${process.env.API_END_POINT}'
};
`;

fs.writeFile(environmentFilePath, envConfigFile, (err) => {
  if (err) {
    console.error("Error writing environment file:", err);
    process.exit(1);
  } else {
    console.log(`Environment variables injected into ${environmentFilePath}`);
  }
});
