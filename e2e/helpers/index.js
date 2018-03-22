/* eslint-disable */

const config = require('../config');
const { rachel, inene } = require('../mockData');

const login = browser => {
  browser.url(config.url);
  browser.pause(500);
  browser.click('.home-sign-in');
  browser.pause(2000);
  browser.setValue('input[name="email"]', rachel.email);
  browser.pause(2000);
  browser.setValue('input[name="password"]', rachel.password);
  browser.pause(2000);
  browser.click('input[type="submit"]');
  browser.pause(1800);
};
const login2 = browser => {
  browser.url(config.url);
  browser.pause(500);
  browser.click('.home-sign-in');
  browser.pause(2000);
  browser.setValue('input[name="email"]', inene.email);
  browser.pause(2000);
  browser.setValue('input[name="password"]', inene.password);
  browser.pause(2000);
  browser.click('input[type="submit"]');
  browser.pause(1800);
};

const createRecipe = browser => {
  browser.click('.home-create-recipe');
  browser.assert.urlEquals(`${config.url}/recipes/create`);

  browser.setValue('input[name="name"]', recipe1.name);
  browser.setValue('input[name="category"]', recipe1.category);
  browser.setValue('textarea[name="description"]', recipe1.description);    
  browser.setValue('textarea[name="ingredients"]', recipe1.ingredients);    
  browser.setValue('textarea[name="method"]', recipe1.method);
  browser.pause(700);
  browser.click('section.container');    
  browser.pause(700);    
  browser.click('button.btn-default');

  browser.pause(700);
};

module.exports = {
  login, login2
};
