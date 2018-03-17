/* eslint-disable */
const config = require('../config');
const { login } = require('../helpers');
const { ofada, chickenChilli } = require('../mockData');

module.exports = {
  'Update recipe: author can update a recipe when authenticated': function (browser) {
    login(browser);
    browser.click('.home-manage-recipes');
    browser.pause(2000);
    browser.assert.urlEquals(`${config.url}/dashboard`);
    browser.click('.single-recipe-name');
    browser.assert.urlContains('view-recipe');
    browser.pause(2000);
    browser.click('.update-button');
    browser.pause(1500);
    browser.clearValue('input[name="name"]')
          .setValue('input[name="name"]', chickenChilli.name);
    browser.pause(2000);

    browser.pause(700); 
    browser.scrollTo('button.btn-default');   
    browser.pause(700);
    browser.click('button.btn-default');
    

    browser.pause(700);

    browser.assert.urlContains('view-recipe');

    browser.expect.element('h2.text-center.title')
      .text.to.contain(chickenChilli.name);
      browser.pause(2000);

    browser.end();
  }
};
