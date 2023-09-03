import { Request, Response } from "express";
import { ProductController } from "../../../controllers/ProductController";
import ProductCategoryDatabaseRepository from "src/adapter/repository/ProductCategoryDatabaseRepository";
import ProductDatabaseRepository from "src/adapter/repository/ProductDatabaseRepository";

const productRepository = new ProductDatabaseRepository();
const productCategoryRepository = new ProductCategoryDatabaseRepository();

export default class ProductAPIController {

	async create(req: Request, res: Response) {
		// #swagger.tags = ['Product']
		// #swagger.description = 'Endpoint para criar um produto.'
		/* #swagger.parameters['createProduct'] = {
				in: 'body',
				description: 'Informações do produto para cadastro.',
				required: true,
				schema: { $ref: "#/definitions/CreateProduct" }
		} */
		/* #swagger.parameters['categoryId'] = { in: 'path', description: 'ID da categoria que deseja registrar o produto' } */
		const { name, description, price } = req.body;
		const { categoryId } = req.params;

		ProductController.create(name, description, price, parseInt(categoryId), productRepository, productCategoryRepository)
			.then((result) => {
				/* #swagger.responses[201] = { 
					schema: { $ref: "#/definitions/Product" },
					description: 'Produto cadastrado' 
				} */
				return res.status(201).json(result);
			})
			.catch((errors) => {
				return res.status(400).json(errors);
			});
	}

	async getById(req: Request, res: Response) {
		// #swagger.tags = ['Product']
		// #swagger.description = 'Endpoint para obter um produto pelo id.'
		/* #swagger.parameters['id'] = { in: 'path', description: 'ID do produto' } */
		const { id } = req.params;

		ProductController.getById(parseInt(id), productRepository)
			.then((result) => {
				/* #swagger.responses[200] = { 
					schema: { $ref: "#/definitions/Product" },
					description: 'Produto encontrado' 
				} */
				return res.status(200).json(result);
			})
			.catch((errors) => {
				return res.status(400).json(errors);
			});
	}

	async getByCategory(req: Request, res: Response) {
		// #swagger.tags = ['Product']
		// #swagger.description = 'Endpoint listar os produtos pelo id de uma categoria.'
		/* #swagger.parameters['categoryId'] = { in: 'path', description: 'ID da categoria para obter os produtos pela categoria' } */
		const { categoryId } = req.params;

		ProductController.getByCategory(parseInt(categoryId), productRepository, productCategoryRepository)
			.then((result) => {
				/* #swagger.responses[200] = { 
					schema: { $ref: "#/definitions/ListProduct" },
					description: 'Produtos encontrados' 
				} */
				return res.status(200).json(result);
			})
			.catch((errors) => {
				return res.status(400).json(errors);
			});
	}

	async update(req: Request, res: Response) {
		// #swagger.tags = ['Product']
		// #swagger.description = 'Endpoint para atualizar um produto pelo id.'
		/* #swagger.parameters['updateProduct'] = {
				in: 'body',
				description: 'Informações do produto para atualização.',
				required: true,
				schema: { $ref: "#/definitions/UpdateProduct" }
		} */
		/* #swagger.parameters['id'] = { in: 'path', description: 'ID do produto' } */
		const { name, description, price, categoryId } = req.body;
		const { id } = req.params;

		ProductController.update(parseInt(id), name, description, price, categoryId, productRepository, productCategoryRepository)
			.then((result) => {
				/* #swagger.responses[200] = { 
					schema: { $ref: "#/definitions/Product" },
					description: 'Produto atualizado' 
				} */
				return res.status(200).json(result);
			})
			.catch((errors) => {
				return res.status(400).json(errors);
			});
	}

	async delete(req: Request, res: Response) {
		// #swagger.tags = ['Product']
		// #swagger.description = 'Endpoint para remover um produto pelo id.'
		/* #swagger.parameters['id'] = { in: 'path', description: 'ID do produto' } */
		const { id } = req.params;

		ProductController.delete(parseInt(id), productRepository)
			.then((result) => {
				/* #swagger.responses[201] = { 
					schema: { $ref: "#/definitions/Product" },
					description: 'Produto removido' 
			} */
				return res.status(200).json(result);
			})
			.catch((errors) => {
				return res.status(400).json(errors);
			});
	}

}