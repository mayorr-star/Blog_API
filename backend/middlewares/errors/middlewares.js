const handleNotFoundError = (err, req, res, next) => {
  if (err.name === "NotFoundError") {
    console.error(err.message);
    console.error(err.stack);
    res.status(err.status || 404).json({ message: err.message });
  } else {
    next(err);
  }
};

const handleServerError = (err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
};

module.exports = { handleNotFoundError, handleServerError };
