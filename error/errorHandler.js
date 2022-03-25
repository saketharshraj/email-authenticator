const ApiError = require("./ApiError")

function errorHandler(err, _, res, _) {
  
  if (err instanceof ApiError) {
    res.status(err.code).json({error:{message: err.message}});
    return;
  }

  res.status(500).json({message: "Something Went Wrong"});
}

module.exports = errorHandler;