import { Request, Response } from "express";
import ProductCategoryDatabaseRepository from "@database/repository/ProductCategoryDatabaseRepository";
import ProductCategoryCreateUseCase from "../../../application/useCase/ProductCategory/ProductCategoryCreateUseCase";
import ProductCategoryFindByIdUseCase from "../../../application/useCase/ProductCategory/ProductCategoryFindByIdUseCase";
import ProductCategoryUpdateUseCase from "../../../application/useCase/ProductCategory/ProductCategoryUpdateUseCase";
import ProductCategoryDeleteUseCase from "../../../application/useCase/ProductCategory/ProductCategoryDeleteUseCase";
import ProductCategoryListUseCase from "../../../application/useCase/ProductCategory/ProductCategoryListUseCase";
import ProductCategoryController from "@controlers/ProductCategoryController";
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

		const result = await ProductCategoryController.create(name, productCategoryRepository);

		/* #swagger.responses[201] = { 
			schema: { $ref: "#/definitions/Category" },
			description: 'Categoria cadastrada' 
		} */
		return res.status(201).json(result);
	}

	async getById(req: Request, res: Response) {
		// #swagger.tags = ['Category']
		// #swagger.description = 'Endpoint para obter uma categoria pelo id.'
		/* #swagger.parameters['id'] = { in: 'path', description: 'ID da categoria' } */
		const { id } = req.params;

		const categoryFindById = new ProductCategoryFindByIdUseCase(productCategoryRepository);
		const result = await categoryFindById.execute(Number(id));

		if (categoryFindById.hasErrors()) {
			return res.status(400).json(categoryFindById.getErrors());
		}

		/* #swagger.responses[200] = { 
			schema: { $ref: "#/definitions/Category" },
			description: 'Categoria encontrada' 
		} */
		return res.status(200).json(result);
	}

	async list(req: Request, res: Response) {
		// #swagger.tags = ['Category']
		// #swagger.description = 'Endpoint para listar todas as categorias criadas.'
		const listCategories = new ProductCategoryListUseCase(productCategoryRepository);
		const result = await listCategories.execute();

		if (listCategories.hasErrors()) {
			return res.status(400).json(listCategories.getErrors());
		}

		/* #swagger.responses[200] = { 
			schema: { $ref: "#/definitions/ListCategories" },
			description: 'Categorias encontrados' 
		} */
		return res.status(200).json(result);
	}


	async update(req: Request, res: Response): Promise<Response> {
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

		const categoryUpdate = new ProductCategoryUpdateUseCase(productCategoryRepository);
		const result = await categoryUpdate.execute({ id: Number(id), name });

		if (categoryUpdate.hasErrors()) {
			return res.status(400).json(categoryUpdate.getErrors());
		}

		/* #swagger.responses[200] = { 
			schema: { $ref: "#/definitions/Category" },
			description: 'Categoria atualizada' 
		} */
		return res.status(200).json(result);
	}

	async delete(req: Request, res: Response) {
		// #swagger.tags = ['Category']
		// #swagger.description = 'Endpoint para remover uma categoria pelo id.'
		/* #swagger.parameters['id'] = { in: 'path', description: 'ID da categoria' } */
		const { id } = req.params;

		const categoryDelete = new ProductCategoryDeleteUseCase(productCategoryRepository);
		categoryDelete.execute(Number(id));

		if (categoryDelete.hasErrors()) {
			return res.status(400).json(categoryDelete.getErrors());
		}

		/* #swagger.responses[200] = {
			description: 'Categoria removida' 
		} */
		return res.status(200).json();
	}
}