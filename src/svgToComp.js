const fs = require("fs");
const prompt = require("prompt-sync")();
const prettier = require("prettier");

const filePath = prompt(`Source File Path => `);

const folderPath = filePath.substring(0, filePath.lastIndexOf("/") + 1);

const fileName = filePath.replace(/^.*[\\\/]/, "").replace(".svg", "");
const upperCaseName = fileName.charAt(0).toUpperCase() + fileName.slice(1);

const outPath = folderPath + upperCaseName + ".js";

console.log(folderPath, upperCaseName, outPath);

const toFront = `
import React from "react"; \n
import { SvgIcon } from "@material-ui/core"; \n

function ${upperCaseName}Icon(props) {\n
  return (\n
`;

const toBack = `
); \n
}\n
\n
export default ${upperCaseName}Icon;
`;

const prettierConfig = {
  printWidth: 85,
  arrowParens: "always",
  semi: true,
  tabWidth: 2,
  parser: "babel",
};

const convertFile = (filePath) => {
  return new Promise((resolve) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      let combined;
      if (err) {
        throw err;
      } else {
        const swapSvgTags = data
          .replace("<svg", "<SvgIcon")
          .replace("</svg>", "</SvgIcon>");
        combined = prettier.format(
          toFront + swapSvgTags + "\n" + toBack,
          prettierConfig
        );
      }

      fs.writeFile(outPath, combined, "utf-8", (err) => {
        if (err) {
          throw err;
        } else {
          resolve();
        }
      });
    });
  });
};

convertFile(filePath);
console.log(outPath);
console.log("Saved!");
