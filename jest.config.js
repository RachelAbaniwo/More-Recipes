const localStorageStore = {};


module.exports = {
  testRegex: './client/src/test/.*.js?x?$',
  coverageDirectory: './client/coverage',
  globals: {
    localStorage: {
      getItem(key) {
        return localStorageStore[key];
      },
      
      setItem(key, value) {
        localStorageStore[key] = value;
      }
    }
  }
};
