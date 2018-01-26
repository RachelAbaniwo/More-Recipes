const pagination = (count, limit, offset) => ({
  totalCount: count,
  pageCount: Math.ceil(count / limit),
  page: Math.floor(offset / limit) + 1,
  pageSize: limit
});

export default pagination;
