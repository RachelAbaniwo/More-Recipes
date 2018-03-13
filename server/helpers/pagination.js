/**
   * Calculates page data
   * @function pagination
   *
   * @param {number} count
   * @param {number} limit
   * @param {number} offset
   *
   * @returns {number} totalCount
   * @returns {number} page
   * @returns {number} pageCount
   * @returns {number} pageSize
   *
   */
const pagination = (count, limit, offset) => ({
  totalCount: count,
  pageCount: Math.ceil(count / limit),
  page: Math.floor(offset / limit) + 1,
  pageSize: limit
});

export default pagination;
