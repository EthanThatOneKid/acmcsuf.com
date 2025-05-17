export * from "./optional";
export * from "./required";

import * as required from "./required";

Object.entries(required).forEach(([key, value]) => {
  if (value === undefined) {
    console.warn("Missing required environment variable:", key);
  }
});
