# Tech Challenge - Self Service
Projeto desenvolvido para o curso de Pós Graduação em Software Architecture para composição da nota.



## 💼 Autores

| [<img src="https://avatars.githubusercontent.com/u/51753091?v=4" width="80px;"/>](https://github.com/AndersonBarbosaDeFreitas) | [<img src="https://avatars.githubusercontent.com/u/1047989?v=4" width="80px;"/>](https://github.com/fagnervalente) | [<img src="https://avatars.githubusercontent.com/u/82381756?v=4" width="80px;"/>](https://github.com/sirio-neto) | [<img src="https://avatars.githubusercontent.com/u/10851086?v=4" width="80px;"/>](https://github.com/augustoefr) |
| --- | --- | --- | --- |
| Anderson | Fagner | Sírio Neto | Augusto |
| RM349783 | RM349755 | RM350545 | RM430064 |


## 📖 Documentos

- FigJam: [Link do Event Storming junto com a Linguagem Ubíqua](https://www.figma.com/file/5De6rNc23ORRVFOVxTFUDT/Event-Storming---Lanchonete-2SOAT?type=whiteboard&node-id=0%3A1&t=Tze0BMEbEmZBjORu-1)


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

#### Executando com K8S e Minikube
- Executar configurações de objetos kubernets
```
kubectl apply -f infra
```
- Obter porta para acesso à service LoadBalancer
```
minikube service svc-api-webserver get --url
```

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

## 🧪 Executando os testes

Para executar testes, execute o seguinte comando:

```bash
npm run test
```

### Verificar Cobertura
Para verificar a cobertura de testes, execute o seguinte comando:
```bash
npm run test:coverage
```

## 🚀 Migrations
É possível executar as migrations de banco de dados criadas. Para isso:
- Executar attach shell no container `self-service-app_webserver`, através da extensão `Docker` do vsCode, ou com o seguinte comando;
```sh
docker exec -it self-service-app_webserver sh
```
- Executar migrations:
```sh
npm run migration:run
```
