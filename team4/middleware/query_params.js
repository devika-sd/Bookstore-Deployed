const query_find = (model,populate) =>  async (req, res, next)=> {
  const reqQuery = {...req.query};
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(param=> delete reqQuery[param])
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  let query = model.find(JSON.parse(queryStr))

  if(req.query.select){
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields)
  }
  if(req.query.sort){
      var fields=req.query.sort.toString()
      const sortBy = fields.split(',').join(' ');
      query = query.sort(sortBy)
  }

const page = parseInt(req.query.page, 10) || 1;
const limit = parseInt(req.query.limit, 10) || 12;
const startIndex = (page - 1) * limit;
const endIndex = page * limit;
const total = await model.countDocuments(JSON.parse(queryStr));

query = query.skip(startIndex).limit(limit);

if (populate) {
  query = query.populate(populate);
}

const results = await query;

const pagination = {};

if (endIndex < total) {
  pagination.next = {
    page: page + 1,
    limit
  };
}

if (startIndex > 0) {
  pagination.prev = {
    page: page - 1,
    limit
  };
}

  res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results
  };
  next();
}
module.exports = query_find;
