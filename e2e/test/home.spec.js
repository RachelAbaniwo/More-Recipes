module.exports = {
  'Home page': function (browser) {
    browser.url('http://localhost:8080');
    browser.pause(3000);
    browser.end();
  }
};
