const fs = require("fs");
const path = require("path");

const envFile = `export const environment = {
    API_END_POINT: '${process.env.API_END_POINT}',
    MAPBOX_TOKEN: '${process.env.MAPBOX_TOKEN}',
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
  } else {
    console.log(` Successfully generated environment.prod.ts`);
  }
});
