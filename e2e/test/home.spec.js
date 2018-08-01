/* eslint-disable */
const config = require('../config');
const { login } = require('../helpers');
const { rachel } = require('../mockData');

module.exports = {
  'Home page with user signed out': function (browser) {
    browser.url(config.url);
    browser.expect.element('body').to.be.present.before(2000);
    browser.expect.element('#home-page-title').text.to.contain('More Recipes');
    browser.expect.element('.home-sign-in').to.be.visible;
    browser.expect.element('.home-sign-up').to.be.visible;    
    browser.expect.element('input[type="text"]').to.be.visible;
  },
  'Home page with signed in user': function (browser) {
    login(browser);
    browser.assert.urlEquals(`${config.url}/`);
    browser.expect.element('.home-sign-out').to.be.visible;
    browser.expect.element('.home-profile').to.be.visible;
    browser.expect.element('.home-create-recipe').to.be.visible; 
    browser.expect.element('.home-manage-recipes').to.be.visible;     
    browser.pause(1000);
  },
  'Home page top favorites button should link to recipes page': function (browser) {
    browser.url(config.url);   
    browser.click('#top-favorites-link');
    browser.assert.urlEquals(`${config.url}/recipes`);
    browser.pause(3000);
    browser.expect.element('select[name="sort"]').to.have.value.that.equals('favorites');
    browser.pause(700);
  },
  'Home page top voted button should link to recipes page': function (browser) {
    browser.url(config.url);   
    browser.click('#top-voted-link');
    browser.assert.urlEquals(`${config.url}/recipes`);
    browser.pause(3000);
    browser.expect.element('select[name="sort"]').to.have.value.that.equals('upvotes');
    browser.pause(700);
    browser.end();
  },
};
