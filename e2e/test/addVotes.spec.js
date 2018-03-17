/* eslint-disable */
const config = require('../config');
const { login, login2 } = require('../helpers');
const { review1 } = require('../mockData');

module.exports = {
  'Upvote recipe: unauthenticated users should not be able to upvote recipe': function (browser) {

    browser.url(config.url);
    browser.pause(500);


    browser.expect.element('input[type="text"]').to.be.visible
    browser.setValue('input[type="text"]', 'Chicken Sauce')
      .keys(browser.Keys.ENTER);
    browser.pause(1000);

    browser.assert.urlEquals(`${config.url}/recipes`);
    browser.pause(700);
    browser.click('.single-recipe');
    browser.pause(700);
    browser.assert.urlContains('view-recipe');
    browser.pause(3000);
    browser.expect.element('span.upvote').text.to.contain('0')
    
    browser.pause(3000);

    browser.assert.visible('i.fa#upvote-button')
    browser.click('i.fa#upvote-button')
    browser.pause(1000)  
    
    browser.expect.element('span.upvote').text.to.contain('0')
    browser.pause(3000)
    browser.end();
    
  },
  'Upvote recipe: authenticated users should be able to upvote a recipe': function (browser) {
    login2(browser);
    browser.pause(500);


    browser.expect.element('input[type="text"]').to.be.visible
    browser.setValue('input[type="text"', 'Chicken Sauce')
      .keys(browser.Keys.ENTER);
    browser.pause(1000);

    browser.assert.urlEquals(`${config.url}/recipes`);
    browser.pause(700);
    browser.click('.single-recipe');
    browser.pause(700);
    browser.assert.urlContains('view-recipe');
    browser.pause(5000)
    
    browser.pause(1000);

    browser.assert.visible('i.fa#upvote-button')
    browser.pause(3000);
    browser.click('i.fa#upvote-button');
    browser.pause(3000)
    browser.click('i.fa#upvote-button');
    browser.pause(3000)

    browser.pause(1000)
    browser.end();
  },
  'Downvote recipe: unauthenticated users should not be able to downvote recipe': function (browser) {
    
    browser.url(config.url);
    browser.pause(500);


    browser.expect.element('input[type="text"]').to.be.visible
    browser.setValue('input[type="text"]', 'Chicken Sauce')
      .keys(browser.Keys.ENTER);
    browser.pause(1000);

    browser.assert.urlEquals(`${config.url}/recipes`);
    browser.pause(700);
    browser.click('.single-recipe');
    browser.pause(700);
    browser.assert.urlContains('view-recipe');
    browser.pause(3000);
    browser.expect.element('span.downvote').text.to.contain('0')
    
    browser.pause(3000);

    browser.assert.visible('i.fa#downvote-button')
    browser.click('i.fa#downvote-button')
    browser.pause(1000) 
    
    browser.expect.element('span.downvote').text.to.contain('0')
    browser.pause(3000)
    browser.end();
    
  },
  'Downvote recipe: authenticated users should be able to downvote a recipe': function (browser) {
    login2(browser);
    browser.pause(500);


    browser.expect.element('input[type="text"]').to.be.visible
    browser.setValue('input[type="text"', 'Chicken Sauce')
      .keys(browser.Keys.ENTER);
    browser.pause(1000);

    browser.assert.urlEquals(`${config.url}/recipes`);
    browser.pause(700);
    browser.click('.single-recipe');
    browser.pause(700);
    browser.assert.urlContains('view-recipe');
    browser.pause(5000)
    
    browser.pause(1000);

    browser.assert.visible('i.fa#downvote-button')
    browser.pause(3000);
    browser.click('i.fa#downvote-button');
    browser.pause(3000)
    browser.click('i.fa#downvote-button');
    browser.pause(3000)

    browser.pause(1000)
    browser.end();
  },
  'Favorite recipe: unauthenticated users should not be able to favorite recipe': function (browser) {
    
    browser.url(config.url);
    browser.pause(500);


    browser.expect.element('input[type="text"]').to.be.visible
    browser.setValue('input[type="text"]', 'Chicken Sauce')
      .keys(browser.Keys.ENTER);
    browser.pause(1000);

    browser.assert.urlEquals(`${config.url}/recipes`);
    browser.pause(700);
    browser.click('.single-recipe');
    browser.pause(700);
    browser.assert.urlContains('view-recipe');
    browser.pause(3000);
    browser.end();
    
  },
  'Favorite recipe: authenticated users should be able to favorite a recipe': function (browser) {
    login2(browser);
    browser.pause(500);


    browser.expect.element('input[type="text"]').to.be.visible
    browser.setValue('input[type="text"', 'Chicken Sauce')
      .keys(browser.Keys.ENTER);
    browser.pause(1000);

    browser.assert.urlEquals(`${config.url}/recipes`);
    browser.pause(700);
    browser.click('.single-recipe');
    browser.pause(700);
    browser.assert.urlContains('view-recipe');
    browser.pause(5000)
    
    browser.pause(1000);

    browser.assert.visible('i.fa#favorite-button')
    browser.pause(3000);
    browser.click('i.fa#favorite-button');
    browser.pause(3000)
    browser.click('i.fa#favorite-button');
    browser.pause(3000)

    browser.pause(1000)
    browser.end();
  },
};
