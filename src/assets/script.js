// Usage: node script.js
// Description: This script is used to generate the committee.js file which is used to import all the images of the committee members and their details.
import fs from "node:fs";
import path from "node:path";

import committees from "./committee.json" with { type: "json" };

const PORTFOLIOS = ["TOPS & MC", "BFM", "GL", "POLOG", "PPIT", "Welfare"];

let out = "";

for (const [index, portfolio] of committees.entries()) {
  for (const committee of portfolio) {
    out += `import ${committee.name.replace(/\s+/g, "")} from "@/assets/committee/${PORTFOLIOS[index]}/${committee.name}.webp";\n`;
  }
}

out += "const committees = [";
for (const portfolio of committees) {
  out += "[";
  for (const committee of portfolio) {
    out += "{";
    for (const [k, v] of Object.entries(committee)) {
      if (typeof v === "number") {
        out += `"${k}": ${v},`;
      } else {
        out += `"${k}": "${v}",`;
      }
    }
    out += `"image": ${committee.name.replace(/\s+/g, "")},`;
    out += "},";
  }
  out += "],";
}
out += "];\n";
out += "export default committees;\n"

const outPath = path.resolve(import.meta.dirname, "committee.js");

fs.writeFile(outPath, out, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`File written successfully to ${outPath}`);
  }
});
