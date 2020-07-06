const prompt = require("prompt-sync")();
const fs = require("fs");

const filePath =
  "/home/victork/Desktop/RedSquare_Work/AirStarter/raw_svg_icons/";

const svg = prompt(`Paste SVG text here => `);
console.log(`SVG file size: ${Buffer.byteLength(svg, "utf8")} bytes`);

const name = prompt(`File Name => `);
console.log(name);

fs.writeFile(filePath + name, svg, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
