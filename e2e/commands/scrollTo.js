/* eslint-disable */
module.exports.command = function (selector) {
  this
  .execute(function (selector) {
      document.querySelector(selector).scrollIntoView();
  }, [selector])
  .pause(200);
};
