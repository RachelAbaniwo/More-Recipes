/* eslint-disable */
const config = require('../config');
const { login } = require('../helpers');
const { rachel, ofada } = require('../mockData');

module.exports = {
  'Create recipe: authenticated user can create recipe': function (browser) {
    login(browser);
    browser.click('.home-create-recipe');
    browser.assert.urlEquals(`${config.url}/recipes/create`);

    browser.setValue('input[name="name"]', ofada.name);
    browser.pause(2000);
    browser.setValue('input[name="category"]', ofada.category);
    browser.pause(2000);
    browser.setValue('textarea[name="description"]', ofada.description);
    browser.pause(2000);    
    browser.setValue('textarea[name="ingredients"]', ofada.ingredients);
    browser.pause(2000);    
    browser.setValue('textarea[name="method"]', ofada.method);
    browser.pause(2000);
    
    browser.scrollTo('button.btn-default');   
    browser.pause(1000);
    browser.click('button.btn-default');

    browser.pause(1000);
    browser.assert.urlContains('view-recipe');
    browser.end();
  },
  'Create recipe displays validation errors if data is invalid': function (browser) {
    login(browser);

    browser.click('.home-create-recipe');
    browser.assert.urlEquals(`${config.url}/recipes/create`);

    browser.pause(1000); 
    browser.scrollTo('button.btn-default');   
    browser.pause(1000);
    browser.click('button.btn-default');

    browser.pause(2000);

    browser.assert.containsText('small.mb-3', 'Recipe name is required');
    browser.pause(1000);

    browser.end();
    
  }
};
