# postech-soat

### Tarefas pendentes
- [ ] Crud Produto (Augusto)
- [ ] Crud Categorias (Augusto)
- [ ] Crud Pedidos (Fagner)
- [ ] Crud Clientes (Fagner)
- [ ] Validação de entrada de dados
- [ ] Swagger (lib) (Fagner Valente)
- [ ] Imagem docker (Sirio)
- [ ] O que danado é o ValueObjects?
- [ ] Testes e HealthCheck (lib)
- [ ] Concluir organização do Projeto (Anderson e Sirio)

# Iniciando

## Configuração
- Clonar repositório:
```
git clone https://github.com/fagnervalente/postech-soat.git
```
- Acessar diretório projeto
```
cd postech-soat
```
- Instalar dependências:
```
npm install
```
- Criar arquivo `.env` com base em arquivo de exemplo, para configuração de variáveis de ambiente:
```
cp .env_example .env
```
- Iniciar serviços containerizados com docker (`postgres`, `pgadmin4` e `webserver`):
```
docker compose up -d
```

## Migrations
É possível executar as migrations de banco de dados criadas. Para isso:
- Executar attach shell no container `self-service-app_webserver`, através da extensão `Docker` do vsCode, ou com o seguinte comando;
```
docker exec -it <nome do container> sh
```
- Executar migrations:
```
npm run migration:run
```
