# Tech Challenge - Self Service
Projeto desenvolvido para o curso de Pós Graduação em Software Architecture para composição da nota.

# 📖 Funcionalidades
1. Cadastro de Clientes
2. Indenficação do Cliente via CPF
3. Criar, editar e remoção de produtos
4. Buscar produtos por categoria
5. Fazer checkout (checkout fake até o momento)
6. Listar os pedidos

# 🚩 Iniciando
Abaixo seguem os passos necessários para baixar e executar o projeto.

## 💻 Configuração
- Clonar repositório:
```sh
git clone https://github.com/fagnervalente/postech-soat.git
```
- Acessar diretório projeto
```sh
cd postech-soat
```
- Instalar dependências:
```sh
npm install
```
- Criar arquivo `.env` com base em arquivo de exemplo, para configuração de variáveis de ambiente:
```sh
cp .env_example .env
```
- Iniciar serviços containerizados com docker (`postgres`, `pgadmin4` e `webserver`):
```sh
docker compose up -d
```

# 🚀 Migrations
É possível executar as migrations de banco de dados criadas. Para isso:
- Executar attach shell no container `self-service-app_webserver`, através da extensão `Docker` do vsCode, ou com o seguinte comando;
```sh
docker exec -it self-service-app_webserver sh
```
- Executar migrations:
```sh
npm run migration:run
```
