require("dotenv").config();
require("express-async-errors");
const express = require("express");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const app = express();
const connectDB = require("./db/connect");
const productsRoutes = require("./routes/products");

app.use(express.json());

app.get("/", (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});
app.use("/api/v1/products", productsRoutes);
app.use(errorHandlerMiddleware);
app.use(notFound);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () => {
			console.log(`Server listing on port ${process.env.PORT}...`);
		});
	} catch (err) {
		console.log(err);
	}
};
start();
