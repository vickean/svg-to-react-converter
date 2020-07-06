import fs from "fs";
import inquirer from "inquirer";
import configs from "./configs/configs";
import prettier from "prettier";
import path from "path";

const prettierConfig = {
  printWidth: 85,
  arrowParens: "always",
  semi: true,
  tabWidth: 2,
  parser: "babel",
};

const defaultsLiteral = `{
  svgFilepath: path.join(__dirname, "..", "..", "svgs"),
  compFilepath: path.join(__dirname, "..", "..", "components"),
}`;

console.log(`

SVG to React MUI SvgIcon Component Converter
============================================
Current Svgs Folder:
${configs.svgFilepath}

Current Components Folder:
${configs.compFilepath}

`);

const modeSelect = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you,like to to?",
        name: "mode",
        choices: [
          "Change configs",
          "Text to SVG conversion",
          "SVG to Component Conversion",
          "Text to Component Conversion",
        ],
      },
    ])
    .then((answers) => {
      // console.log(answers.mode);
      switch (answers.mode) {
        case "Change configs":
          changeConfigs();
          break;
        case "Text to SVG conversion":
          console.log("B");
          break;
        case "SVG to Component Conversion":
          console.log("C");
          break;
        case "Text to Component Conversion":
          console.log("D");
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const changeConfigs = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which configs do you want ot change?",
        name: "configOp",
        choices: [
          "Reset all to default",
          "Change SVG folder path",
          "Change Component folder path",
        ],
      },
    ])
    .then((answers) => {
      // console.log(answers.configOp);
      switch (answers.configOp) {
        case "Reset all to default":
          resetAllToDefault();
          break;
        case "Change SVG folder path":
          setSVGpath();
          break;
        case "Change Component folder path":
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const resetAllToDefault = () => {
  fs.readFile(
    path.join(__dirname, "configs", "configs.js"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        const replaced = data.replace(new RegExp("{([^}]*)}"), defaultsLiteral);
        const prettified = prettier.format(replaced, prettierConfig);
        // console.log(prettified);

        fs.writeFile(
          path.join(__dirname, "configs", "configs.js"),
          prettified,
          "utf-8",
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Configs reset to defaults.");
            }
          }
        );
      }
    }
  );
};

const setSVGpath = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter full path to SVG output folder:",
        name: "svgPath",
      },
    ])
    .then((answers) => {
      console.log(answers.svgPath);
      fs.readFile(
        path.join(__dirname, "configs", "configs.js"),
        "utf-8",
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            configs.svgFilepath = answers.svgPath;
            console.log(configs);

            const replaced = data.replace(
              new RegExp("{([^}]*)}"),
              JSON.stringify(configs)
            );
            const prettified = prettier.format(replaced, prettierConfig);

            fs.writeFile(
              path.join(__dirname, "configs", "configs.js"),
              prettified,
              "utf-8",
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Configs reset to defaults.");
                }
              }
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

modeSelect();
