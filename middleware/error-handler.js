const errorHandlerMiddleware = async (err, rea, res, next) => {
	return res.status(500).json({ msg: err });
};

module.exports = errorHandlerMiddleware;
