const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const inFile =
  process.env.DATA_FILE || path.join(__dirname, `../data/WEEZ.csv.gz`);

const stream = fs.createReadStream(inFile).pipe(zlib.createGunzip());

const lineReader = require("readline").createInterface({
  input: stream,
});

const isValidRow = ([, siret, idcc]) =>
  !!siret && !!idcc && !isNaN(idcc) && idcc !== "0";

const sirets = {};

lineReader.on("line", (line) => {
  const row = line.split(",").map((cell) => cell.trim());
  if (isValidRow(row)) {
    const [, siret, idcc] = row;
    if (sirets[siret]) {
      if (!sirets[siret].includes(idcc)) {
        sirets[siret].push(idcc);
      }
    } else {
      sirets[siret] = [idcc];
    }
  }
});

lineReader.on("close", () => {
  console.log(`✅ Loaded ${inFile}`);
});

const getSirets = () => sirets;

module.exports = getSirets;
