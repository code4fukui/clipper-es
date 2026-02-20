import ClipperLib from "./clipper.js";

console.log("version", ClipperLib.version);

const lines = [
  [{ X: 1, Y: 2 }, { X: 2, Y: 3 }],
  [{ X: 1, Y: 2 }, { X: 2, Y: 3 }],
];

const scale = 100;
ClipperLib.JS.ScaleUpPaths(lines, scale);
console.log(lines);
