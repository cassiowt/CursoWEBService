Crie um pacote de implantação.

>zip function.zip index.js

Crie a função do Lambda com o comando create-function AWS Command Line Interface (AWS CLI). Para o parâmetro role, insira o nome do recurso da Amazon (ARN) da função que você copiou anteriormente.

> aws lambda create-function --function-name LambdaFunctionOverHttps \
--zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x \
--role arn:aws:iam::123456789012:role/service-role/lambda-apigateway-role

**Retorno**
/Users/cassio.trindade/git/CursoWEBService/ExemploFuncaoLambdaAWS/retornoCriscaoLambdaIndex.json

**Arquivo JSON  denominado** *input.txt*.

**Execute o comando  AWS CLI**

>aws lambda invoke --function-name LambdaFunctionOverHttps \
--payload file://input.txt outputfile.txt
