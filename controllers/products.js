const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields, numericFilters } = req.query;
	const queryObject = {};
	if (featured) {
		queryObject.featured = featured === "true" ? true : false;
	}
	if (company) {
		queryObject.company = {
			$regex: company,
			$options: "i",
		};
	}
	if (name) {
		queryObject.name = {
			$regex: name,
			$options: "i",
		};
	}
	if (numericFilters) {
		const operatorMap = {
			">": "$gt",
			">=": "$gte",
			"=": "$eq",
			"<": "$lt",
			"<=": "$lte",
		};
		const regEx = /\b(<|>|>=|=|<=)\b/g;
		let filters = numericFilters.replace(
			regEx,
			(match) => `-${operatorMap[match]}-`
		);
		const options = ["price", "rating"];
		filters.split(",").forEach((item) => {
			const [field, operator, value] = item.split("-");
			if (options.includes(field)) {
				queryObject[field] = {
					[operator]: Number(value),
				};
			}
		});
	}
	let result = Product.find(queryObject);
	// sort functionality
	if (sort) {
		const sortList = sort.replace(",", " ");
		console.log(sortList);
		result = result.sort(sortList);
	} else {
		result = result.sort("createdAt");
	}
	// select functionality
	if (fields) {
		const selectedFields = fields.replace(",", " ");
		result = result.select(selectedFields);
	}
	// pagination functionality
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	// skip data for page and limit
	result = result.skip(skip).limit(limit);
	const products = await result;
	res.status(200).json({
		success: true,
		nbHits: products.length,
		pagination: { page, limit },
		products,
	});
};

module.exports = { getAllProducts };
