# Passo a Passo para Criar  REST com API Gateway e LAMBDA 

## DynamoDB
* Abra o console do DynamoDB em https://console.aws.amazon.com/dynamodb/.
* Escolha Create table.
* Em Table name (Nome da tabela), insira http-crud-tutorial-items.
* Em Partition key, (Chave de partição), insira id.
Salve o código *index.js*.

## Criar a função LAMBDA
* Abra o console do Lambda em https://console.aws.amazon.com/lambda
* Escolha Create function (Criar função).
* Em Function name (Nome da função), insira http-crud-tutorial-function.
* Em Permissions (Permissões), escolha Change default execution role (Alterar a função de execução padrão).
* Selecione Criar uma nova função a partir de modelos de política da AWS.
* Em Role name (Nome da função), insira http-crud-tutorial-role.
* Em Policy templates (Modelos de políticas), escolha Simple microservice permissions. Esta política concede à função do Lambda permissão para interagir com o DynamoDB.
* Escolha Create function (Criar função).

* Abra index.js no editor de código do console e substitua seu conteúdo pelo código a seguir. Escolha Deploy (Implantar) para atualizar a sua função.
```javascript
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "DELETE /items/{id}":
        await dynamo
          .delete({
            TableName: "http-crud-tutorial-items",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /items/{id}":
        body = await dynamo
          .get({
            TableName: "http-crud-tutorial-items",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /items":
        body = await dynamo.scan({ TableName: "http-crud-tutorial-items" }).promise();
        break;
      case "PUT /items":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "http-crud-tutorial-items",
            Item: {
              id: requestJSON.id,
              price: requestJSON.price,
              name: requestJSON.name
            }
          })
          .promise();
        body = `Put item ${requestJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
```

## Criar uma API HTTP
* Inicie uma sessão no console do API Gateway em https://console.aws.amazon.com/apigateway.
* Escolha Create API (Criar API) e, em seguida, em API HTTP (API HTTP), escolha Build (Criar).
* Em API name (Nome da API), insira http-crud-tutorial-api.
* Escolha Next (Próximo).
* Em Configure routes (Configurar rotas), escolha Next (Próximo) para ignorar a criação da rota. Você cria rotas mais tarde.
* Analise o estágio que o API Gateway | _$default_ | cria para você e escolha Next (Avançar).
* Escolha Create (Criar).

## Criar rotas
* Inicie uma sessão no console do API Gateway em https://console.aws.amazon.com/apigateway.
* Selecione a API.
* Selecione Routes (Rotas).
* Escolha Create (Criar).
* Em Método, escolha GET.
* Para o caminho, insira /items/{id}. O {id} no final do caminho é um parâmetro de caminho que o API Gateway recupera do caminho de solicitação quando um cliente faz uma solicitação.
* Escolha Create (Criar).
  * Repita as etapas quatro a sete para GET /items, DELETE /items/{id} e PUT /items.

## Criar uma integração
* Inicie uma sessão no console do API Gateway em https://console.aws.amazon.com/apigateway.
* Selecione a API.
* Escolha Integrations (Integrações).
* Escolha Manage integrations (Gerenciar integrações) e, em seguida, escolha Create (Criar).
* Pule Attach this integration to a route (Anexar esta integração a uma rota). Você conclui isso em uma etapa posterior.
* Em Integration type (Tipo de integração), escolha Lambda function (Função do Lambda).
* Em Lambda function (Função do Lambda), insira http-crud-tutorial-function.
* Escolha Create (Criar).

## Anexar integrações a rotas
* Inicie uma sessão no console do API Gateway em https://console.aws.amazon.com/apigateway.
* Selecione a API.
* Escolha Integrations (Integrações).
* Escolha uma rota.
* Em Choose an existing integration (Escolher uma integração existente), escolha http-crud-tutorial-function.
* Escolha Attach integration (Anexar integração).
  * Repita as etapas para todas as rotas.


## Testar a sua API
* Inicie uma sessão no console do API Gateway em https://console.aws.amazon.com/apigateway.
* Selecione a API.
* Observe o URL de invocação da sua API. Ela aparece em Invoke URL (Invocar URL) na página Details (Detalhes).
* Inicie o Postman
* Teste as Rotas
____

# LIMPAR TUDO
# Excluir uma tabela do DynamoDB

* Abra o console do DynamoDB em https://console.aws.amazon.com/dynamodb/.
* Selecionar a sua tabela.
* Selecione Delete table (Excluir tabela).
* Confirme a sua decisão e escolha Delete (Excluir).

# Excluir uma API HTTP
* Inicie uma sessão no console do API Gateway em https://console.aws.amazon.com/apigateway.
* Na página APIs , selecione uma API. Escolha Actions (Ações) e, depois, escolha Delete (Excluir).
* Escolha Delete (Excluir). 

# Excluir uma função do Lambda
* Abra o console do Lambda em https://console.aws.amazon.com/lambda
* Na página Functions(Funções), selecione uma função. Escolha Actions (Ações) e, depois, escolha Delete (Excluir).
* Escolha Delete (Excluir).

# Excluir um grupo de logs de uma função do Lambda
* No console do Amazon CloudWatch, abra a página Log groups (Grupos de log).
* Na página Log groups (Grupos de log), selecione o grupo de log da função (/aws/lambda/http-crud-tutorial-function). Escolha Actions (Ações) e selecione Delete log group (Excluir grupo de log).
* Escolha Delete (Excluir).

# Excluir a função de execução de uma função do Lambda
* No console do AWS Identity and Access Management, abra a página Roles (Funções).
* Selecione a atribuição da função, por exemplo, http-crud-tutorial-role.
* Selecione Delete role (Excluir função).
* Escolha Sim, excluir.

