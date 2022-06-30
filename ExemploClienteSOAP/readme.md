* Criar um cliente SOAP para consumir uma calculador 
  * Sera implementado en Node.js
  * Usando a biblioteca soap 


* Projeto passo a passo
  * Instalar o node.js https://nodejs.org/pt-br/download/package-manager/
  * Com a instalação do Node.js intala-se o NMP https://www.npmjs.com/
  * Criar a pasta do projeto 
  >mkdir ExemploClienteSOAP && cd ExemploClienteSOAP
  * Iniciar o projeto 
  >npm init <br>
  * Para todos os quesitos confirme com enter
  >  package name: (ExemploClienteSOAP) <br>
    version: (1.0.0) <br>
    description:<br>
    entry point: (index.js)<br>
    test command: <br>
    git repository: <br>
    keywords: <br>
    author: <br>
    license: (ISC) <br>
  * Será gerado o arquivo _package.json_
  * Instalar a biblioteca soap
  > npm install soap
  * verificar o arquivo package.json e notar a node_modules


* Vamos criar o arquivo index.js 
  * vamos adicionar as biblioteca _soap_
  ```javascript
  var soap = require('soap');
  ```
  * Criar a variavel url para definir nora URI WSDL
  ```javascript
  var url1 = 'http://www.dneonline.com/calculator.asmx?wsdl';
  ```
  * Utilizar o método _createClient_ da biblioteca _soap_ para descrever as funções
  ```javascript
  soap.createClient(url, function (err, client) {
    console.log('Descreve -> ', client.describe().Calculator.CalculatorSoap) 
  })
  ```
  
  * O resultado sera uma listagem contendo os métodos, parametros input e parametos output
  * Para ver o resultado execute o comando
  > node index.js
  
  * Comente a descrição, e vamos implementar um metodo de soma.
  ```javascript
  soap.createClient(url, function(err, client) {
      client.Add({intA: 2, intB: 3}, function (err, result) {
          if (err) return console.log(err);
          console.log("SOMA: ", result.AddResult);
      });
  });
  ``` 
  * Para ver o resultado execute o comando
  > node index.js

  * Vamos implementar um metodo de subtração (dentro de _soap.createClient(url, function(err, client) {..._).
  ```javascript
     client.Subtract({ intA: 2, intB:3}, function(err, result) {
        if(err) return console.log(err);
        console.log("SUBTRAÇÃO: ", result.SubtractResult);
    });
  ```
  * Vamos implementar um metodo de mutiplicação  (dentro de _soap.createClient(url, function(err, client) {..._)
  ```javascript
   client.Multiply({ intA: 2, intB:3}, function(err, result) {
        if(err) return console.log(err);
        console.log("MULTIPLICAÇÃO: ", result.MultiplyResult);
    });
  ```
  * Vamos implementar um metodo de divisão (dentro de _soap.createClient(url, function(err, client) {..._).
  ```javascript
  client.Subtract({ intA: 2, intB:3}, function(err, result) {
        if(err) return console.log(err);
        console.log("SUBTRAÇÃO: ", result.SubtractResult);
    });
  ```
  * Para ver o resultado execute o comando
  > node index.js

____


Criar um client SOAP para consumir o Web Service do Correios Brasileiros.
  * Criar o arquivo correios.js

  ```javascript
  var soap = require('soap')
  var url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'
  
  soap.createClient(url, function (err, client){
      if(err){
          console.log(err)
      } else {
         client.consultaCEP({
             cep: ''
         }, (err, res) => {
             console.log(res)
         })
      }
     // console.log('DESCRIBE -->', client.describe().AtendeClienteService.AtendeClientePort )
  });
  ```
  * Para ver o resultado execute o comando
  > node index.js
