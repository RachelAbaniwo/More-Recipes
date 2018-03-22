/* eslint-disable */
import chai from 'chai';
import {
  checkEmail,
  checkname,
  checkUsername,
  checkPassword,
  checkField
} from '../../helpers/checkInput';

const expect = chai.expect;

describe('Check input helpers', () => {
  describe('Check email input helper', () => {
    it('should return false if email passed is invalid', (done) => {
      const result = checkEmail('test.com');
     expect(result).to.equal(false);
     done();
    });
    it('should return true if email passed is valid', (done) => {
      const result = checkEmail('test@test.com');
     expect(result).to.equal(true);
     done();
    });
  });
  describe('Check name input helper', () => {
    it('should return false if characters passed are not alphanumeric', () => {
      const result = checkname('..;jji!!');
      expect(result).to.equal(false);
    });
    it('should return false if the number of characters passed is not between 3 and 15', () => {
      const result = checkname('ab');
      const result2 = checkname('abcdefghijkflmnop');
      expect(result).to.equal(false);
      expect(result2).to.equal(false);
    });
    it('should return true if characters passed are alphanumeric and the number of characters are between 3 and 15', 
      () => {
      const result = checkname('Hanna');
      expect(result).to.equal(true);
    });
  });
  describe('Check Username input helper', () => {
    it('should return false if characters passed are not alphanumeric', () => {
      const result = checkUsername('..;jji!!');
      expect(result).to.equal(false);
    });
    it('should return false if the number of characters passed is not between 3 and 15', () => {
      const result = checkUsername('ab');
      const result2 = checkUsername('abcdefghijkflmnop');
      expect(result).to.equal(false);
      expect(result2).to.equal(false);
    });
    it('should return true if characters passed are alphanumeric and the number of characters are between 3 and 15', 
      () => {
      const result = checkUsername('Hanna');
      expect(result).to.equal(true);
    });
  });
  describe('Check Password input helper', () => {
    it('should return false if characters passed are not alphanumeric characters, _ and -', () => {
      const result = checkPassword(';jji!!');
      expect(result).to.equal(false);
    });
    it('should return false if the number of characters passed is not between 6 and 15', () => {
      const result = checkPassword('anita');
      const result2 = checkPassword('abcdefghijk-.lmnop');
      expect(result).to.equal(false);
      expect(result2).to.equal(false);
    });
    it('should return true if characters passed are valid and the number of characters are between 6 and 15', 
      () => {
      const result = checkPassword('HannaCrayzie');
      expect(result).to.equal(true);
    });
  });
  describe('Check Field input helper', () => {
    it('should return true if white spaces are passed', () => {
      const result = checkField('         ');
      expect(result).to.equal(true);
    });
    it('should return false if characters passed are valid', 
      () => {
      const result = checkField('I love this so much');
      expect(result).to.equal(false);
    });
  });
});