/* eslint-disable */
const config = require('../config');

module.exports = {
  'User should be redirected to a 404 page if the link the user navigates is not registered on the application': 
  function (browser) {
    browser.url(`${config.url}/nothingness`);
    browser.pause(1000);
    browser.expect.element('body').to.be.present.before(2000);
    browser.expect.element('#page-not-found-title').to.be.visible;
    browser.expect.element('#page-not-found-title').text.to.contain('404');
    browser.expect.element('#lost-your-way').to.be.visible;
    browser.expect.element('#lost-your-way').text.to.contain('Hey! it seems you lost your way');
    browser.pause(2000);
    browser.end();
  }
};
