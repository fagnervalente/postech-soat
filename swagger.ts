const swaggerAutoGen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/adapter/http/routes/*.{ts,js}'];

const doc = {
	info: {
		version: "1.0.0",
		title: "Postech - Self Service",
		description: "Documentação sobre os endpoints fornecidos pela API."
	},
	host: "localhost:3000",
	basePath: "/",
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	tags: [
		{
			"name": "Customer",
			"description": "Endpoints"
		},
		{
			"name": "Order",
			"description": "Endpoints"
		},
		{
			"name": "Category",
			"description": "Endpoints"
		},
		{
			"name": "Product",
			"description": "Endpoints"
		},
		{
			"name": "HelthCheck",
			"description": "Endpoints"
		}
	],
	definitions: {
		Customer: {
			id: 1,
			name: "Anderson",
			cpf: "12345678912",
			email: "anderson@gmail.com",
			orders: []
		},
		CreateCustomer: {
			$name: "Anderson",
			$cpf: "12345678912",
			$email: "anderson@gmail.com"
		},
		ListCustomers: [
			{
				$ref: "#/definitions/Customer"
			}
		],
		Category: {
			id: 1,
			name: "Lanche"
		},
		CreateCategory: {
			$name: "Lanche",
		},
		ListCategories: [
			{
				$ref: "#/definitions/Category"
			}
		],
		UpdateCategory: {
			$name: "Lanche",
		},
		Product: {
			id: 1,
			name: "Hambúrguer",
			description: "Pão quentinho, alface e tomate fresquinhos, hambúrguer bovino e maionese de ervas.",
			price: 18,
			category: {
				$ref: "#/definitions/Category"
			}
		},
		CreateProduct: {
			$name: "Hambúrguer",
			$description: "Pão quentinho, alface e tomate fresquinhos, hambúrguer bovino e maionese de ervas.",
			$price: 18,
		},
		UpdateProduct: {
			$id: 1,
			name: "Hambúrguer",
			description: "Pão quentinho, alface e tomate fresquinhos, hambúrguer bovino e maionese de ervas.",
			price: 18,
			category: {
				id: 1,
				name: "Lanche",
			},
		},
		Order: {
			id: 1,
			status: {
				'@enum': [
					"Recebido",
					"Em preparação",
					"Pronto",
					"Finalizado"
				],
				default: "Recebido"
			},
			paymentstatus: {
				'@enum': [
					"Aprovado",
					"Recusado",
					"Aguardando pagamento"
				],
				default: "Aprovado"
			},
			products: [
				{
					$ref: "#/definitions/Product"
				}
			],
			customer: {
				$ref: "#/definitions/Customer"
			},
			totalPrice: 18
		},
		ListOrders: [
			{
				$ref: "#/definitions/Order"
			}
		],
		Checkout: {
			$products: [1],
			cpf: "12345678912",
		},
	}
}


swaggerAutoGen(outputFile, endpointsFiles, doc);