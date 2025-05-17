import { readFileSync } from "node:fs";

const PATH_BEE_MOVIE = "src/lib/public/blog/data/bee-movie.txt";
const PATH_ENCHANTED_BY_TAYLOR_SWIFT =
  "src/lib/public/blog/data/enchanted.html";

export const TXT_BEE_MOVIE = readFileSync(PATH_BEE_MOVIE, "utf-8");
export const TXT_ENCHANTED_BY_TAYLOR_SWIFT = readFileSync(
  PATH_ENCHANTED_BY_TAYLOR_SWIFT,
  "utf-8",
);
