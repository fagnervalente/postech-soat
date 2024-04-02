# 🟪 Tech Challenge - Self Service
Projeto desenvolvido para o curso de Pós Graduação em Software Architecture para composição da nota.



## 💼 Autores

| [<img src="https://avatars.githubusercontent.com/u/51753091?v=4" width="80px;"/>](https://github.com/AndersonBarbosaDeFreitas) | [<img src="https://avatars.githubusercontent.com/u/1047989?v=4" width="80px;"/>](https://github.com/fagnervalente) | [<img src="https://avatars.githubusercontent.com/u/82381756?v=4" width="80px;"/>](https://github.com/sirio-neto) | [<img src="https://avatars.githubusercontent.com/u/10851086?v=4" width="80px;"/>](https://github.com/augustoefr) |
| --- | --- | --- | --- |
| Anderson | Fagner | Sírio Neto | Augusto |
| RM349783 | RM349755 | RM350545 | RM430064 |


## 📖 Documentos

- FigJam: [Link do Event Storming junto com a Linguagem Ubíqua](https://www.figma.com/file/5De6rNc23ORRVFOVxTFUDT/Event-Storming---Lanchonete-2SOAT?type=whiteboard&node-id=0%3A1&t=Tze0BMEbEmZBjORu-1)
- RIPD: [Relatório RIPD](https://drive.google.com/file/d/1HZCBtTihv-VGrZWyedxWsCWoVvzhB7Bf/view?usp=sharing)

**Repositórios**
- [Infraestrutura](https://github.com/fagnervalente/postech-soat-infra/tree/feature/saga)
- [microsserviço de usuários](https://github.com/fagnervalente/postech-soat-user)
- [microsserviço de produtos](https://github.com/fagnervalente/postech-soat-product)
- [microsserviço de pedido](https://github.com/fagnervalente/postech-soat-order)
- [microsserviço de pagamento](https://github.com/fagnervalente/postech-soat-payment)
- [microsserviço de produção](https://github.com/fagnervalente/postech-soat-process)

## 🔥 Documentação API

Para informações sobre os endpoints disponibilizados pela API, após realizar o deploy do projeto basta acessar `localhost:3000/docs`, será exibido o swagger com as funcionalidades disponíveis.



## 🛠 Funcionalidades

- Cadastro de Clientes
- Indenficação do Cliente via CPF
- Criar, editar e remoção de produtos
- Buscar produtos por categoria
- Fazer checkout (checkout fake até o momento)
- Listar os pedidos criados


## 🚩 Iniciando
Abaixo seguem os passos necessários para baixar e executar o projeto.

### 💻 Configuração
- Clonar repositório:
```sh
git clone https://github.com/fagnervalente/postech-soat.git
```
- Acessar diretório projeto
```sh
cd postech-soat
```
- Executar aplicação. Pode ser executada em ambiente de desenvolvimento à partir do Docker, ou a partir do Kubernetes (usa a imagem latest da aplicação no Dockerhub):

## ☁️ Implantação

O projeto para ser feito deploy na AWS via Terraform se encontra no repositório: [Projeto de deploy PosTech](https://github.com/fagnervalente/postech-soat-infra/tree/feature/microservices-integration)

#### Executando com K8S e Minikube
- Executar configurações de objetos kubernets
```
kubectl apply -f infra
```
- Obter porta para acesso à service LoadBalancer
```
minikube service svc-api-webserver get --url
```

### Desenho da Arquitetura

<kbd><img src="https://drive.google.com/uc?export=view&id=1cTjT7KgGPv7sAUxgxmvEQYbXA0IjaqaN" alt="Diagrama AWS" style="border-radius:8px" /></kbd>

#### Executando com docker
- Instalar dependências:
```sh
npm install
```
- Criar arquivo `.env` com base em arquivo de exemplo, para configuração de variáveis de ambiente:
```sh
cp .env_example .env
```
- Iniciar serviços containerizados com docker (`postgres` e `webserver`):
```sh
docker compose up -d
```

## 💬 Padrão SAGA

Para o desevolvimento e implementação do Padrão SAGA foi adotado o padrão coreografia.

### Motivação

Dado os cenários possíveis e a comunição simples entre apenas três microsserviços, o padrão coreografia foi escolhido por ser mais rápido em sua implementação que o padrão orquestrado, uma vez que não seria necessário mapear cada cenário possível para os eventos, implementar e testar. No padrão coreografia, podemos trabalhar de forma forma rápida e isolada, tornando maís rápido sua integração a aplicação já existente, somado a simplicidade dos fluxos. Em um cenário no qual a função de estoque existisse na aplicação, seria mais propício a adesão do padrão orquestrado, dado que haveria uma camada a mais de complexidade, o que tornaria o gerenciamento de responsabilidades mais complicado.

### Desenho do Padrão

<kbd><img src="https://drive.google.com/uc?export=view&id=1KuvYvDSa2X1QOsej0zjM4mI_eCv_mE4z" alt="Diagrama SAGA" style="border-radius:8px" /></kbd>

#### Descrição
**1**. Publica o pedido na fila created_orders para criar intenção de pagamento;

**2**. Consome pedidos na fila created_orders para realizar o pagamento;

**3**. Publica o pedido com pagamento confirmado na fila confirmed_payments para ser produzido;

**4**. Publica o pedido confirmado na fila status_payment para atualizar o status do pagamento do pedido;

**5**. Consome os pedidos confirmados na fila confirmed_payments para realizar a produção;

**6**. Consome os pedidos confirmados na fila status_payment para atualizar o status do pagamento do pedido e notificar o cliente se foi confirmado ou não o pagamento;

**7**. Publica o pedido na fila status_order para atualizar o status de produção do pedido;

**8**. Consome os pedidos da fila status_order para realizar a atualização do status do pedido.


