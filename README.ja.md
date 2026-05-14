# clipper-es

2Dポリゴンのクリッピングおよびオフセット操作のための、堅牢なClipperライブラリのESモジュール移植版です。

[**ライブデモ**](https://code4fukui.github.io/clipper-es/example/main_demo.html)

インタラクティブなデモでは、さまざまなクリッピングタイプ、オフセット、ポリゴン形状を試すことができ、パフォーマンスベンチマークも含まれています。

## 特徴

- **ブーリアンクリッピング操作**: ポリゴンやラインの交差 (Intersection)、結合 (Union)、差分 (Difference)、XORをサポート。
- **ポリゴンおよびラインのオフセット**: マイター (miter)、スクエア (square)、ラウンド (round) の結合タイプをサポート。
- **堅牢な形状処理**: 複雑な形状、自己交差、開いたパス（ポリライン）を正しく処理。
- **複数の塗りつぶし規則**: Even-Odd、Non-Zero、Positive、Negativeの塗りつぶし規則をサポート。
- **高性能**: 整数演算を使用して数値の安定性を確保しつつ、速度を最適化。
- **高度な操作**: Minkowski Sum（ミンコフスキー和）および Difference（ミンコフスキー差）関数を収録。
- **モダンJavaScript**: ESモジュールとして提供。ブラウザやNode.jsでの幅広い互換性のためにUMDもサポート。

## 使い方

```js
import ClipperLib from "https://code4fukui.github.io/clipper-es/clipper.js";

// パスは {X, Y} の座標点を持つ配列です
const subjectPaths = [
  [{ X: 100, Y: 100 }, { X: 200, Y: 100 }, { X: 200, Y: 200 }, { X: 100, Y: 200 }]
];
const clipPaths = [
  [{ X: 150, Y: 150 }, { X: 250, Y: 150 }, { X: 250, Y: 250 }, { X: 150, Y: 250 }]
];

// 浮動小数点の誤差を避けるため、すべての座標を整数にスケールアップします。
const scale = 100;
ClipperLib.JS.ScaleUpPaths(subjectPaths, scale);
ClipperLib.JS.ScaleUpPaths(clipPaths, scale);

const clipper = new ClipperLib.Clipper();
const clipType = ClipperLib.ClipType.ctIntersection;
const solution = new ClipperLib.Paths();

clipper.AddPaths(subjectPaths, ClipperLib.PolyType.ptSubject, true);
clipper.AddPaths(clipPaths, ClipperLib.PolyType.ptClip, true);
clipper.Execute(clipType, solution, ClipperLib.PolyFillType.pftEvenOdd, ClipperLib.PolyFillType.pftEvenOdd);

// 結果の座標を浮動小数点にスケールダウンして戻します。
ClipperLib.JS.ScaleDownPaths(solution, scale);
console.log(JSON.stringify(solution));
```

## 由来とクレジット

このライブラリは、Angus Johnson氏による高性能なオリジナル **Clipper** ライブラリの移植版です。

- **オリジナルC++ライブラリ**: [polyclipping](https://sourceforge.net/projects/polyclipping/) by Angus Johnson
- **オリジナルJavaScript移植版**: [Javascript Clipper](http://sourceforge.net/projects/jsclipper/)
- **フォーク元**: [junmer/clipper-lib](https://github.com/junmer/clipper-lib)

オリジナルJavaScript移植版の詳細情報、サンプル、ドキュメントについては以下をご覧ください:
<http://jsclipper.sourceforge.net/6.2.1.0/>

## ライセンス

[Boost Software License (BSL1.0)](https://www.boost.org/LICENSE_1_0.txt)
