
const logErrors = (err, req, res, next) =>{
  console.error(err);
  next(err);
};

const errorHandler = (err, req, res, next) =>{ //eslint-disable-line
  res.status(err.status || 500);
  res.json(err.message);
};

module.exports = {
  logErrors,
  errorHandler,
};