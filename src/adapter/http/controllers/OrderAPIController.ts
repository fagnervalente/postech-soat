import { Request, Response } from "express";
import OrderDatabaseRepository from "@database/repository/OrderDatabaseRepository";
import CustomerDatabaseRepository from "@database/repository/CustomerDatabaseRepository";
import ProductDatabaseRepository from "@database/repository/ProductDatabaseRepository";
import PaymentStatusGatewayMercadopago from "../../payment/PaymentStatusGatewayMercadopago";
import MercadopagoIntegration from "../../../external/MercadopagoIntegration";
import OrderController from "@controllers/OrderController";

const orderRepository = new OrderDatabaseRepository();
const customerRepository = new CustomerDatabaseRepository();
const productRepository = new ProductDatabaseRepository();

export default class OrderAPIController{
    async checkout(req: Request, res: Response) {
		// #swagger.tags = ['Order']
		// #swagger.description = 'Endpoint para realizar o checkout.'
		/* #swagger.parameters['checkout'] = {
				in: 'body',
				description: 'Informações do pedido para checkout.',
				required: true,
				schema: { $ref: "#/definitions/Checkout" }
		} */
		const { products, cpf } = req.body;

        OrderController.checkout(products, cpf, orderRepository, customerRepository, productRepository)
            .then((result: any)=>{
                /* #swagger.responses[201] = { 
                    schema: { $ref: "#/definitions/Order" },
                    description: 'Pedito criado' 
                } */
                return res.status(201).json(result);
            })
            .catch((errors: any)=>{
                return res.status(400).json(errors);
            });
	}

    async list(req: Request, res: Response) {
		// #swagger.tags = ['Order']
		// #swagger.description = 'Endpoint para listar todos os pedidos.'
		
        OrderController.list(orderRepository)
            .then((result: any)=>{
                /* #swagger.responses[200] = { 
                    schema: { $ref: "#/definitions/ListOrders" },
                    description: 'Pedidos encontrados' 
                } */
                return res.status(200).json(result);
            })
            .catch((errors: any)=>{
                return res.status(400).json(errors);
            });
	}

    async handlePaymentWebhook(req: Request, res: Response){
		const orderId = Number(req.params.id);
		const webhookNotification = req.body;

        const paymentAPIIntegration = new MercadopagoIntegration(webhookNotification);
        const paymentStatusGateway = new PaymentStatusGatewayMercadopago(paymentAPIIntegration);
        
        OrderController.handlePaymentWebhook(orderId, paymentStatusGateway, orderRepository)
            .then(()=>{
                return res.status(200).json();
            })
            .catch((errors: any)=>{
                return res.status(400).json(errors);
            });
	}

    async getPaymentStatus(req: Request, res: Response) {
		// #swagger.tags = ['Order']
		// #swagger.description = 'Endpoint que retorna o status de pagamento de um pedido.'
		const orderId = Number(req.params.id);

        OrderController.getPaymentStatus(orderId, orderRepository)
            .then((result: any)=>{
                /* #swagger.responses[200] = { 
                    schema: { $ref: "#/definitions/GetPaymentStatus" },
                    description: 'Status do pedido' 
                } */
                return res.status(200).json(result);
            })
            .catch((errors: any)=>{
                return res.status(400).json(errors);
            });
	}
}