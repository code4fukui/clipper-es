# clipper-es

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

An ES module port of the robust Clipper library for 2D polygon clipping and offsetting operations.

[**LIVE DEMO**](https://code4fukui.github.io/clipper-es/example/main_demo.html)

The interactive demo allows you to experiment with different clipping types, offsets, and polygon shapes, and includes a performance benchmark.

## Features

-   **Boolean Clipping Operations**: Intersection, union, difference, and XOR for polygons and lines.
-   **Polygon and Line Offsetting**: Supports miter, square, and round join types.
-   **Robust Shape Handling**: Correctly processes complex, self-intersecting, and open paths (polylines).
-   **Multiple Fill Rules**: Supports Even-Odd, Non-Zero, Positive, and Negative filling rules.
-   **High Performance**: Optimized for speed using integer math to ensure numerical stability.
-   **Advanced Operations**: Includes Minkowski Sum and Difference functions.
-   **Modern JavaScript**: Provided as an ES module, with UMD support for broad compatibility in browsers and Node.js.

## Usage

```js
import ClipperLib from "https://code4fukui.github.io/clipper-es/clipper.js";

// Paths are arrays of points {X, Y}
const subjectPaths = [
  [{ X: 100, Y: 100 }, { X: 200, Y: 100 }, { X: 200, Y: 200 }, { X: 100, Y: 200 }]
];
const clipPaths = [
  [{ X: 150, Y: 150 }, { X: 250, Y: 150 }, { X: 250, Y: 250 }, { X: 150, Y: 250 }]
];

// All coordinates are scaled up to integers to avoid floating-point inaccuracies.
const scale = 100;
ClipperLib.JS.ScaleUpPaths(subjectPaths, scale);
ClipperLib.JS.ScaleUpPaths(clipPaths, scale);

const clipper = new ClipperLib.Clipper();
const clipType = ClipperLib.ClipType.ctIntersection;
const solution = new ClipperLib.Paths();

clipper.AddPaths(subjectPaths, ClipperLib.PolyType.ptSubject, true);
clipper.AddPaths(clipPaths, ClipperLib.PolyType.ptClip, true);
clipper.Execute(clipType, solution, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftEvenOdd);

// Scale the solution back down to floating-point coordinates.
ClipperLib.JS.ScaleDownPaths(solution, scale);
console.log(JSON.stringify(solution));
```

## Origin and Attribution

This library is a port of the original high-performance **Clipper** library by Angus Johnson.

-   **Original C++ Library**: [polyclipping](https://sourceforge.net/projects/polyclipping/) by Angus Johnson
-   **Original JavaScript Port**: [Javascript Clipper](http://sourceforge.net/projects/jsclipper/)
-   **Forked from**: [junmer/clipper-lib](https://github.com/junmer/clipper-lib)

For more information, examples, and documentation on the original JavaScript port, visit:
<http://jsclipper.sourceforge.net/6.2.1.0/>

## License

[Boost Software License (BSL1.0)](https://www.boost.org/LICENSE_1_0.txt)