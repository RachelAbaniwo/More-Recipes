/* eslint-disable */
const config = require('../config');
const { login } = require('../helpers');

module.exports = {
  'Update recipe, author can update a recipe when authenticated': function (browser) {
    login(browser);
    browser.click('.home-manage-recipes');
    browser.pause(1000);
    browser.assert.urlEquals(`${config.url}/dashboard`);
    browser.click('.single-recipe-name');
    browser.assert.urlContains('view-recipe');
    browser.pause(700);
    browser.click('.delete-button');
    browser.pause(2000);

    browser.click('.close-modal');
    browser.assert.urlContains('view-recipe');

    browser.pause(2000);
    browser.click('.delete-button');
    browser.pause(2000);
    browser.click('.delete-recipe');
    browser.pause(2000);
  
    browser.assert.urlEquals(`${config.url}/dashboard`);
    browser.pause(7000);
    browser.end();
  }
};
