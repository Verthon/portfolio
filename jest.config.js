module.exports = {
  verbose: true,
  transform: {
    "^.+\\.[jt]sx?$": "<rootDir>/tests/jest-preprocess.js",
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
  },
  globals: {
    __PATH_PREFIX__: ``,
  },
  collectCoverageFrom: [
    './src/**/*.{ts,tsx}',
    '!./src/icons/**',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  testURL: `http://localhost`,
  setupFilesAfterEnv: ['<rootDir>/tests/setup-test-env.js'],
  setupFiles: [`<rootDir>/tests/loadershim.js`],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
}