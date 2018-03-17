/* eslint-disable */
const config = require('../config');
const { login } = require('../helpers');
const { review } = require('../mockData');

module.exports = {
  'Review recipe: unauthenticated users should not be able to review a recipe': function (browser) {
    
    browser.url(config.url);
    browser.pause(500);


    browser.expect.element('input[type="text"]').to.be.visible
    browser.pause(1500);
    browser.setValue('input[type="text"', 'Chicken Sauce')
    .keys(browser.Keys.ENTER);
    browser.pause(3000);

    browser.assert.urlEquals(`${config.url}/recipes`);
    browser.pause(1500);
    browser.click('.single-recipe');
    browser.pause(1500);
    browser.assert.urlContains('view-recipe');
    browser.pause(700);

    browser.setValue('textarea',review.review);

    browser.scrollTo('button.btn-default');   
    browser.pause(1500);
    browser.click('button.btn-default');

    browser.expect.element('article.review').text.to.not.contain(review.review);

    browser.pause(1500);
    browser.end();
  },
  'Review recipe: authenticated users should be able to review a recipe': function (browser) {
    login(browser);
    browser.pause(500);


    browser.expect.element('input[type="text"]').to.be.visible
    browser.pause(1500);
    browser.setValue('input[type="text"', 'Chicken Sauce')
    .keys(browser.Keys.ENTER);
    browser.pause(1000);

    browser.assert.urlEquals(`${config.url}/recipes`);
    browser.pause(700);
    browser.click('.single-recipe');
    browser.pause(700);
    browser.assert.urlContains('view-recipe');
    browser.pause(700);

    browser.setValue('textarea', review.review);

    browser.pause(700);
    browser.scrollTo('button.review.btn.btn-default');
    browser.pause(700);
    browser.click('button.review.btn.btn-default');
    browser.pause(4000);

    browser.expect.element('article.review').text.to.contain(review.review);

    browser.pause(700);
    browser.end();
  },
};
