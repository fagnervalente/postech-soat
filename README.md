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

## Utilização
- Após inicialização dos containers, será possível acessar o servidor, juntamente dos endpoint da `ApiAdapter`, através da porta configurada na variável `SERVER_PORT` no `.env`.

## Testes
É possível executar os testes automatizados incluídos no projeto. Para isso:
- Executar attach shell no container `self-service-app_webserver`, através da extensão `Docker` do vsCode, ou com o seguinte comando;
```
docker exec -it <nome do container> sh
```
- Executar testes de integração:
```
npm run test
```