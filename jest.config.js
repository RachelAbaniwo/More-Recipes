const localStorageStore = {};


module.exports = {
  setupTestFrameworkScriptFile: './client/src/test/setupTests.js',
  testRegex: './client/src/test/.*.js?x?$',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/', '<rootDir>/client/src/test/setupTests.js'
  ],
  coverageDirectory: './client/coverage',
  globals: {
    localStorage: {
      getItem(key) {
        return localStorageStore[key];
      },

      setItem(key, value) {
        localStorageStore[key] = value;
      },

      removeItem(key) {
        delete localStorageStore[key];
      }
    },
    JSON: {
      parse: (payload => payload),
      stringify: (payload => payload)
    }
  }
};
