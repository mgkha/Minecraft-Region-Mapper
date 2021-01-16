const fs = require("fs");
const fsExtra = require("fs-extra");

const oldCenterRegion = [0, -1];
const newCenterRegion = [-1, 7];

function expandRegion(center, amount) {
  let start = [center[0] + amount, center[1] + amount];

  let metric = 2 * amount + 1;
  let region = [];

  for (let i = 0; i < metric; i++) {
    let temp = [...start];
    temp[1] -= i;
    let row = [];
    for (let j = 0; j < metric; j++) {
      row = [...row, [temp[0], temp[1]]];
      temp[0] -= 1;
    }
    region = [...region, row];
    row = [];
  }

  return region;
}

const oldExpended = expandRegion(oldCenterRegion, 1);
const newExpended = expandRegion(newCenterRegion, 1);

fsExtra.emptyDirSync("./new_region/");

oldExpended.forEach((row, i) => {
  row.forEach((column, j) => {
    let regionFile = `./old_region/r.${column[0]}.${column[1]}.mca`;
    let exist = fs.existsSync(regionFile);

    if (!exist) {
      throw new Error("No region found!");
    }
    fs.copyFileSync(
      regionFile,
      `./new_region/r.${newExpended[i][j][0]}.${newExpended[i][j][1]}.mca`
    );
    console.log(`./old_region/r.${column[0]}.${column[1]}.mca`)
    console.log(`./new_region/r.${newExpended[i][j][0]}.${newExpended[i][j][1]}.mca`)
  });
});
