/* eslint-disable */
import chai from 'chai'
import pagination from '../../helpers/pagination';

const expect = chai.expect;

describe('Pagination helper', () => {
  it('should return the correctly calculated total-count, page-count, page and page-size', 
    (done) => {
     const pageInformation = {
       pageData: pagination(20,5,0)
     }
     expect(pageInformation.pageData.totalCount).to.equal(20);
     expect(pageInformation.pageData.pageCount).to.equal(4);
     expect(pageInformation.pageData.page).to.equal(1);
     expect(pageInformation.pageData.pageSize).to.equal(5);
     done();
   })
});



