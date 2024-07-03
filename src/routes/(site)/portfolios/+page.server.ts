import { portfolios } from "./data";

export function load() {
  return {
    summaries: portfolios.map((portfolio) => ({
      title: portfolio.title,
      url: portfolio.url,
      imageURL: portfolio.imageURL
    }))
  }
}