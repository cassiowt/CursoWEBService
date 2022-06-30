Criar um Serviço SOAP para executar calculos matemáticos
* Sera implementado en Node.js
* Usando Express, implementa o protocolo HTTP (https://expressjs.com/pt-br/starter/hello-world.html)
* Usando a biblioteca soap


* Projeto passo a passo
    * Instalar o node.js https://nodejs.org/pt-br/download/package-manager/
    * Com a instalação do Node.js intala-se o NMP https://www.npmjs.com/
    * Criar a pasta do projeto
  >mkdir ExemploServerSOAP && cd ExemploServerSOAP
    * Iniciar o projeto
  >npm init <br>
    * Para todos os quesitos confirme com enter
  >  package name: (ExemploServerSOAP) <br>
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
    * Instalar a biblioteca Express
    > npm install express
    * verificar o arquivo package.json e notar a node_modules
    * Criar o arquivo _wscalc1.wsdl_
    * Criar o arquivo index.js

```javascript
  const express = require('express')
  const soap = require('soap');
  const app = express()
  
  var myservice = {
    ws: {
        calc: {
            somar : function(args) {
                var n = 1*args.a + 1*args.b;
                return { sumres : n };
            },
            multiplicar : function(args) {
                  var n = args.a * args.b;
                  return { mulres : n };
            }
        }
      }
  };
  
  var xml = require('fs').readFileSync('wscalc1.wsdl', 'utf8');
  
  app.listen(8001, function(){
      soap.listen(app, '/wscalc1', myservice, xml, function(){
        console.log('server initialized');
         });
  });
```
* Para para iniciar o servidor execute o comando:
> node index.js

______


Criar um cliete SOAP para consumir o Web Service local
  *  Criar a pasta do projeto
  > mkdir ExemploClienteLocalSOAP && cd ExemploServerLocalSOAP
  * Iniciar o projeto
  >npm init 
  * Para todos os quesitos confirme com enter
  * Instalar a biblioteca soap
  > npm install soap
  * Verificar o arquivo package.json
  * Criar o arquivo index.js
  ```javascript
  var soap = require('soap');
  var url = 'http://localhost:8001/wscalc1?wsdl';
  
  soap.createClient(url, function(err, client) {
    if (err) throw err;
    //console.log(client.describe().ws.calc);
    client.multiplicar({a: 4,b: 3},function(err,res){
      if (err) throw err;
      console.log(res);
    });
    client.somar({a: 4,b: 3},function(err,res){
      if (err) throw err;
      console.log(res);
    });
  });
```  



