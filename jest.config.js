module.exports = {
  setupTestFrameworkScriptFile: './client/src/test/setupTests.js',
  testRegex: './client/src/test/.*.js?x?$',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/client/src/test/setupTests.js',
    '<rootDir>/client/src/test/mockData/',
    '<rootDir>/client/src/test/fileMock.js'
  ],
  // collectCoverageFrom: [
  //   '<rootDir>/client/src/**.{js|jsx}'
  // ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/client/src/test/fileMock.js'
  },
  coverageDirectory: './client/coverage',
  collectCoverage: true
};
