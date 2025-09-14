module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  // ⬇️ Transform all ESM deps inside node_modules (except keep perf intact)
  transformIgnorePatterns: [
    "node_modules/(?!(query-string|split-on-first|strict-uri-encode|decode-uri-component|filter-obj)/)"
  ],
    moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.ts",
  },
  setupFiles: ['<rootDir>/src/jest.polyfills.ts'],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
