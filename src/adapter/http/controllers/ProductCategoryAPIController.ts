import { Request, Response } from "express";
import ProductCategoryDatabaseRepository from "@database/repository/ProductCategoryDatabaseRepository";
import ProductCategoryController from "@controllers/ProductCategoryController";

const productCategoryRepository = new ProductCategoryDatabaseRepository();

export default class ProductCategoryAPIController {

	async create(req: Request, res: Response) {
		// #swagger.tags = ['Category']
		// #swagger.description = 'Endpoint para criar uma categoria.'
		/* #swagger.parameters['createCategory'] = {
				in: 'body',
				description: 'Informações da categoria para cadastro.',
				required: true,
				schema: { $ref: "#/definitions/CreateCategory" }
		} */
		const { name } = req.body;
		ProductCategoryController.create(name, productCategoryRepository)
			.then((result: any)=>{
					/* #swagger.responses[201] = { 
						schema: { $ref: "#/definitions/Category" },
						description: 'Categoria cadastrada' 
					} */
					return res.status(201).json(result);
			})
			.catch((errors: any)=>{
					return res.status(400).json(errors);
			});
	}

	async getById(req: Request, res: Response) {
		// #swagger.tags = ['Category']
		// #swagger.description = 'Endpoint para obter uma categoria pelo id.'
		/* #swagger.parameters['id'] = { in: 'path', description: 'ID da categoria' } */
		const { id } = req.params;

		ProductCategoryController.getById(parseInt(id), productCategoryRepository)
			.then((result: any)=>{
				/* #swagger.responses[200] = { 
					schema: { $ref: "#/definitions/Category" },
					description: 'Categoria encontrada' 
				} */
				return res.status(200).json(result);
			})
			.catch((errors: any)=>{
				return res.status(400).json(errors);
			});
	}

	async list(req: Request, res: Response) {
		// #swagger.tags = ['Category']
		// #swagger.description = 'Endpoint para listar todas as categorias criadas.'

		ProductCategoryController.list(productCategoryRepository)
			.then((result: any)=>{
				/* #swagger.responses[200] = { 
					schema: { $ref: "#/definitions/ListCategories" },
					description: 'Categorias encontrados' 
				} */
				return res.status(200).json(result);
			})
			.catch((errors: any)=>{
				return res.status(400).json(errors);
			});
	}


	async update(req: Request, res: Response) {
		// #swagger.tags = ['Category']
		// #swagger.description = 'Endpoint para atualizar uma categoria pelo id.'
		/* #swagger.parameters['updateCategory'] = {
				in: 'body',
				description: 'Informações da categoria para atualização.',
				required: true,
				schema: { $ref: "#/definitions/UpdateCategory" }
		} */
		const { name } = req.body;
		const { id } = req.params;

		ProductCategoryController.update(parseInt(id), name, productCategoryRepository)
			.then((result: any)=>{
				/* #swagger.responses[200] = { 
					schema: { $ref: "#/definitions/Category" },
					description: 'Categoria atualizada' 
				} */
				return res.status(200).json(result);
			})
			.catch((errors: any)=>{
				return res.status(400).json(errors);
			});
	}

	async delete(req: Request, res: Response) {
		// #swagger.tags = ['Category']
		// #swagger.description = 'Endpoint para remover uma categoria pelo id.'
		/* #swagger.parameters['id'] = { in: 'path', description: 'ID da categoria' } */
		const { id } = req.params;

		ProductCategoryController.delete(parseInt(id), productCategoryRepository)
			.then((result: any)=>{
				/* #swagger.responses[200] = {
					description: 'Categoria removida' 
				} */
				return res.status(200).json(result);
			})
			.catch((errors: any)=>{
				return res.status(400).json(errors);
			});
	}
}