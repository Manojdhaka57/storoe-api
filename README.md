# Store API

## [Live api link](https://store-api-g7gg.onrender.com/api/v1/products)

```
https://store-api-g7gg.onrender.com/api/v1/products
```

## Tech

```tech
- Node Js
- Express JS
- MongoDB
```

## Installation

store api requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/Manojdhaka57/storoe-api.git
npm i
npm run app
```

# Environment Variables

To use the `getAllProducts` API, you may need to set up the following environment variables:

- **MONGO_URI**: The URI of your MongoDB database.
- **PORT**: The port on which the server will run (optional, default is 3000).

You can set these environment variables in a `.env` file or through your hosting platform.

Example `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/your_database
PORT=3000
```

# getAllProducts

This API endpoint retrieves a list of products based on various query parameters. It supports filtering by product features, company name, product name, numeric filters (for fields like price and rating), sorting, selecting specific fields, and pagination.

## Request

- Method: GET
- Endpoint: /api/v1/products

## Query Parameters

- **featured**: Filter products by feature. Use true to filter featured products.
- **company**: Filter products by company name using case-insensitive regex matching.
- **name**: Filter products by name using case-insensitive regex matching.
- **numericFilters**: Filter products based on numeric values. Supports operators <, >, <=, >=, and =. Example: numericFilters=price>50,rating>=4.
- **sort**: Sort products. Provide a comma-separated list of fields for sorting. Example: sort=price,-rating (ascending price, descending rating).
- **fields**: Select specific fields to include in the response. Provide a comma-separated list of fields.
- **page**: Specify the page number for pagination (default is 1).
- **limit**: Specify the number of items per page (default is 10).

## Example Request

```sh
GET /api/v1/products?featured=true&company=example&name=product&numericFilters=price>50,rating>=4&sort=price,-rating&fields=name,price&page=1&limit=10
```

## Response

```json
{
	"success": true,
	"nbHits": 5,
	"pagination": {
		"page": 1,
		"limit": 10
	},
	"products": [
		{
			"name": "Product 1",
			"price": 55.99
			// Other selected fields
		}
		// Additional products
	]
}
```

## Implementation Details

- The API utilizes the Mongoose library to interact with the MongoDB database.
- Various query parameters are used to filter, sort, select fields, and paginate the results.
- Numeric filters support comparison operators for specific numeric fields.
- Sorting is applied based on the provided field names and their order.
- The response includes information about the success of the request, the number of hits, pagination details, and the list of products.
- Feel free to customize the API usage based on your specific requirements.
