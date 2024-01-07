export default {
  "**/*.(prisma|sql)": "prettier --write --list-different",
  "**/*.(js|mjs|jsx|json)": [
    "eslint --cache --fix",
    "prettier --write --list-different",
  ],
  "**/*.(ts|tsx|cts|mts)": [
    "eslint --cache --fix",
    "prettier --write --list-different",
    () => "tsc --noEmit",
  ],
};
