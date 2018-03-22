/* eslint-disable */
const config = require('../config');
const { login } = require('../helpers');
const { rach } = require('../mockData');

module.exports = {
  'View dashboard: authenticated users should be able to view their dashboard': function (browser) {
    login(browser);
    browser.click('.home-manage-recipes');
    browser.pause(1000);
    browser.assert.urlEquals(`${config.url}/dashboard`);
    browser.expect.element('.profile-card').to.be.visible;
    browser.expect.element('.my-recipes').to.be.visible;
    browser.expect.element('.my-favorites').to.be.visible;
    browser.pause(2000);
    
    browser.click('.my-favorites');
    browser.pause(2000);
    browser.click('.my-recipes');
    browser.pause(2000);
    browser.expect.element('.single-recipe').to.be.visible;
    browser.pause(2000);
    
    browser.scrollTo('.btn-default');
    browser.pause(1500);
    browser.click('.btn-default');
    browser.pause(2000);
    browser.assert.urlEquals(`${config.url}/update-profile`);
    browser.pause(2000);
    
    browser.clearValue('input[name="username"]')
    .setValue('input[name="username"]', rach.username);
browser.pause(2000);
    browser.clearValue('textarea[name="aboutMe"]')
.setValue('textarea[name="aboutMe"]', rach.aboutMe);
    browser.pause(2000);
    browser.scrollTo('.btn-default');
    browser.pause(1500);
    browser.click('.btn-default');
    browser.pause(2000);
    
    browser.assert.urlEquals(`${config.url}/dashboard`);
    browser.pause(2000);
    browser.expect.element('p.text-center.display-name')
    .text.to.contain(rach.username);
    browser.pause(2000);
    browser.expect.element('p.text-center.about-me')
    .text.to.contain(rach.aboutMe);
    browser.pause(2000);

    browser.end();
  }
};
