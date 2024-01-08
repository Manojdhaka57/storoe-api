const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
	const { featured, company, name } = req.query;
	const queryObject = {};
	if (featured) {
		queryObject.featured = featured === "true" ? true : false;
	}
	if (company) {
		queryObject.company = {
			$regex: company,
			$opions: "i",
		};
	}
	if (name) {
		queryObject.name = {
			$regex: name,
			$options: "i",
		};
	}
	const products = await Product.find(queryObject);
	res.status(200).json({ success: true, nbHits: products.length, products });
};

module.exports = { getAllProducts };
