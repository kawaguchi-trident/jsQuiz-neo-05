// ===== このファイルの役割 =====
// 「名作文学リスト」のデータ（配列）を定義し、外部ファイル（index.html）から
// 使えるように export するためのモジュールです。
// ヒント:
//   ・const の前に export を付けるだけでもOK
//       export const books = [ ... ];
//   ・宣言の後ろにまとめて書く形でもOK
//       export { books };


const books = [
  { title: '吾輩は猫である', author: '夏目漱石' },
  { title: '羅生門', author: '芥川龍之介' },
  { title: '人間失格', author: '太宰治' },
];

// 上の `books` を export してください
export { books };