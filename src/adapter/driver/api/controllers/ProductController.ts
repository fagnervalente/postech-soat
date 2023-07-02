import { Request, Response } from 'express';
import ProductService from '../../../../core/application/services/ProductService';
import InMemoryProductRepository from '../../../driven/persistence/InMemoryProductRepository';

const productRepository = new InMemoryProductRepository();
const productService = new ProductService(productRepository);

class ProductController {
	private service: ProductService = productService;

	public async getListing(req: Request, res: Response): Promise<Response> {
		const response = await this.service.getListing();

		return res.status(200).json(response);
	}

	public async getById(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const response = await this.service.getById(id);

		if (this.service.hasErrors()) {
			return res.status(400).json(this.service.getErrors());
		}

		return res.status(200).json(response);
	}

	public async store(req: Request, res: Response): Promise<Response> {
		const { name, price } = req.body;
		const response = await this.service.store({id: '', name, price});

		if (this.service.hasErrors()) {
			return res.status(400).json(this.service.getErrors());
		}

		return res.json(response);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { name, price } = req.body;

		const response = await this.service.update({id, name, price});

		if (this.service.hasErrors()) {
			return res.status(400).json(this.service.getErrors());
		}

		return res.json(response);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const response = await this.service.delete(id);

		if (this.service.hasErrors()) {
			return res.status(400).json(this.service.getErrors());
		}

		return res.json(response);
	}
}

export default new ProductController();