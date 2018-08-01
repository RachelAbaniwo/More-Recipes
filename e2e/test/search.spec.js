/* eslint-disable */
const config = require('../config');
const { login } = require('../helpers');

module.exports = {
  'Search for a recipe: authenticated users can successfully search for a recipe': function (browser) {
    browser.url(config.url);
    browser.pause(500);
    
    browser.expect.element('input[type="text"]').to.be.visible
    browser.setValue('input[type="text"', 'Chicken Sauce')
    .keys(browser.Keys.ENTER);
    browser.pause(1000);

    browser.assert.urlEquals(`${config.url}/recipes`);

    browser.expect.element('body').to.be.present.before(2000);
    browser.expect.element('.navbar').to.be.visible; 
    browser.expect.element('input[name="search"]').to.be.visible;
    browser.expect.element('select[name="sort"]').to.be.visible;
    browser.expect.element('select[name="limit"]').to.be.visible;

    browser.expect.element('input[name="search"]').to.have.value.that.equals('Chicken Sauce');

    browser.expect.element('.single-recipe').text.to.contain('Chicken Sauce');
    
    browser.pause(2000);
    
    browser.end();
  },
  'Search for a recipe: unauthenticated users can successfully search for a recipe': function (browser) {
    login(browser);
    browser.url(config.url);
    browser.pause(500);
    
    browser.expect.element('input[type="text"]').to.be.visible
    browser.setValue('input[type="text"', 'Chicken Sauce')
    .keys(browser.Keys.ENTER);
    browser.pause(1000);

    browser.assert.urlEquals(`${config.url}/recipes`);

    browser.expect.element('body').to.be.present.before(2000);
    browser.expect.element('.navbar').to.be.visible; 
    browser.expect.element('input[name="search"]').to.be.visible;
    browser.expect.element('select[name="sort"]').to.be.visible;
    browser.expect.element('select[name="limit"]').to.be.visible;

    browser.expect.element('input[name="search"]').to.have.value.that.equals('Chicken Sauce');

    browser.expect.element('.single-recipe').text.to.contain('Chicken Sauce');
    
    browser.pause(2000);
    
    browser.end();
  }
};
