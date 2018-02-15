"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
/**
   * Calculates page data
   * @function
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
const pagination = function pagination(count, limit, offset) {
  return {
    totalCount: count,
    pageCount: Math.ceil(count / limit),
    page: Math.floor(offset / limit) + 1,
    pageSize: limit
  };
};

exports.default = pagination;
