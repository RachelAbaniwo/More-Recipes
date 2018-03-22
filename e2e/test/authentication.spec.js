/* eslint-disable */
const config = require('../config');
const {
  rachel, henry, wrongCharacterSignUp, wrongPasswordSignIn
} = require('../mockData');

module.exports = {
  'Register: a new user should successfully register if all fields are filled appropriately': function (browser) {
    browser.url(config.url);
    browser.pause(500);
    
    browser.click('.home-sign-up');

    browser.assert.urlEquals(`${config.url}/signup`);

    browser.expect.element('body').to.be.present.before(2000);
    browser.expect.element('.navbar').to.be.visible;
    browser.expect.element('#register-card').to.be.visible;    
    browser.expect.element('input[name="name"]').to.be.visible;
    browser.expect.element('input[name="email"]').to.be.visible;
    browser.expect.element('input[name="password"]').to.be.visible;
    
    browser.setValue('input[name="name"]', henry.name);
    browser.pause(2000);
    browser.setValue('input[name="email"]', henry.email);
    browser.pause(2000);
    browser.setValue('input[name="password"]', henry.password);
    browser.pause(1000);
    
    browser.click('input[type="submit"]');
    browser.pause(800);
    
    browser.assert.urlEquals(`${config.url}/`);
    
    browser.expect.element('.home-sign-out').to.be.visible;
    browser.expect.element('.home-profile').to.be.visible;
    browser.expect.element('.home-create-recipe').to.be.visible; 
    browser.expect.element('.home-manage-recipes').to.be.visible;     
    browser.pause(1000);
    
    browser.end();
  },
  'Register: a new user should see validation errors if they fill the fields with invalid characters': function (browser) {
    browser.url(config.url);
    browser.pause(500);
    
    browser.click('.home-sign-up');

    browser.assert.urlEquals(`${config.url}/signup`);

    browser.expect.element('body').to.be.present.before(2000);
    browser.expect.element('.navbar').to.be.visible;
    browser.expect.element('#register-card').to.be.visible;    
    browser.expect.element('input[name="name"]').to.be.visible;
    browser.expect.element('input[name="email"]').to.be.visible;
    browser.expect.element('input[name="password"]').to.be.visible;
    
    browser.setValue('input[name="name"]', wrongCharacterSignUp.name);
    browser.pause(2000);
    browser.setValue('input[name="email"]', wrongCharacterSignUp.email);
    browser.pause(2000);
    browser.setValue('input[name="password"]', wrongCharacterSignUp.password);
    browser.pause(1000);
    
    browser.click('input[type="submit"]');
    browser.pause(700);

    browser.assert.containsText(
      'small.mb-3', 'Your name should have a minimum of 3 characters'
    );
    browser.assert.urlEquals(`${config.url}/signup`);
    browser.pause(700);

    browser.end();
  },
  'Register: a new user should see validation errors if they do not fill the empty fields': function (browser) {
    browser.url(config.url);
    browser.pause(500);
    
    browser.click('.home-sign-up');

    browser.assert.urlEquals(`${config.url}/signup`);

    browser.expect.element('body').to.be.present.before(2000);
    browser.expect.element('.navbar').to.be.visible;
    browser.expect.element('#register-card').to.be.visible;    
    browser.expect.element('input[name="name"]').to.be.visible;
    browser.expect.element('input[name="email"]').to.be.visible;
    browser.expect.element('input[name="password"]').to.be.visible;
    
    browser.setValue('input[name="name"]', '');
    browser.pause(1000);
    browser.setValue('input[name="email"]', '');
    browser.pause(1000);
    browser.setValue('input[name="password"]', '');
    browser.pause(1000);
    
    browser.click('input[type="submit"]');
    browser.pause(700);

    browser.assert.containsText(
      'small.mb-3', 'Name is required!'
    );
    browser.assert.urlEquals(`${config.url}/signup`);
    browser.pause(700);

    browser.end();
  },
  'Sign in: a user should successfully sign in if all fields are filled with valid details': function (browser) {
    browser.url(config.url);
    browser.pause(500);
    
    browser.click('.home-sign-in');

    browser.assert.urlEquals(`${config.url}/signin`);

    browser.expect.element('body').to.be.present.before(2000);
    browser.expect.element('.navbar').to.be.visible;
    browser.expect.element('#login-card').to.be.visible;
    browser.expect.element('input[name="email"]').to.be.visible;
    browser.expect.element('input[name="password"]').to.be.visible;
    
    browser.setValue('input[name="email"]', rachel.email);
    browser.pause(2000);
    browser.setValue('input[name="password"]', rachel.password);
    browser.pause(2000);
    
    browser.click('input[type="submit"]');
    browser.pause(2000);
    
    browser.assert.urlEquals(`${config.url}/`);
    
    browser.expect.element('.home-sign-out').to.be.visible;
    browser.expect.element('.home-profile').to.be.visible;
    browser.expect.element('.home-create-recipe').to.be.visible; 
    browser.expect.element('.home-manage-recipes').to.be.visible;     
    browser.pause(1000);
    
    browser.end();
  },
  'Sign in: user should see validation errors if they fill in wrong credentials': function (browser) {
    browser.url(config.url);
    browser.pause(500);
    
    browser.click('.home-sign-in');

    browser.assert.urlEquals(`${config.url}/signin`);

    browser.expect.element('body').to.be.present.before(2000);
    browser.expect.element('.navbar').to.be.visible;
    browser.expect.element('#login-card').to.be.visible;
    browser.expect.element('input[name="email"]').to.be.visible;
    browser.expect.element('input[name="password"]').to.be.visible;
    
    browser.setValue('input[name="email"]', wrongPasswordSignIn.email);
    browser.pause(2000);
    browser.setValue('input[name="password"]', wrongPasswordSignIn.password);
    browser.pause(2000);
    
    browser.click('input[type="submit"]');
    browser.pause(2000);

    browser.assert.containsText('small.mb-3', 'Wrong credentials');
    browser.assert.urlEquals(`${config.url}/signin`);
    browser.pause(2000);

    browser.end();
  },
  'Sign in: user should see validation errors if they leave the fields empty': function (browser) {
    browser.url(config.url);
    browser.pause(500);
    
    browser.click('.home-sign-in');

    browser.assert.urlEquals(`${config.url}/signin`);

    browser.expect.element('body').to.be.present.before(2000);
    browser.expect.element('.navbar').to.be.visible;
    browser.expect.element('#login-card').to.be.visible;
    browser.expect.element('input[name="email"]').to.be.visible;
    browser.expect.element('input[name="password"]').to.be.visible;
    
    browser.setValue('input[name="email"]', '');
    browser.pause(2000);
    browser.setValue('input[name="password"]', '');
    browser.pause(2000);
    
    browser.click('input[type="submit"]');
    browser.pause(2000);

    browser.assert.containsText('small.mb-3', 'Email is required');
    browser.assert.urlEquals(`${config.url}/signin`);
    browser.pause(1000);

    browser.end();
  },
};
