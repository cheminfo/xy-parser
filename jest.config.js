{
  "scripts": {
    "build": "npm run tsc-esm && cheminfo-build --entry lib-esm/index.js --root XYParser",
    "build-doc": "cheminfo doc",
    "check-types": "tsc --noEmit",
    "clean": "rimraf lib lib-esm",
    "eslint": "eslint src --config eslint.config.mjs",
    "eslint-fix": "eslint src --config eslint.config.mjs --fix",
    "prepack": "npm run tsc",
    "prettier": "prettier --check src",
    "prettier-write": "prettier --write src",
    "test": "npm run test-only && npm run eslint && npm run prettier && npm run check-types",
    "test-only": "jest --coverage",
    "tsc": "npm run clean && npm run tsc-cjs && npm run tsc-esm",
    "tsc-cjs": "tsc --project tsconfig.cjs.json",
    "tsc-esm": "tsc --project tsconfig.esm.json"
  }
}
