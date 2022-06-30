Criar um Web Service usando API REST

* Sera implementado en Node.js
* Usando a biblioteca soap
* Usando Express, implementa o protocolo HTTP (https://expressjs.com/pt-br/starter/hello-world.html)

  Projeto passo a passo
* Instalar o node.js https://nodejs.org/pt-br/download/package-manager/
* Com a instalação do Node.js intala-se o NMP https://www.npmjs.com/
* Criar a pasta do projeto
    
>mkdir ExemploClienteSOAP && cd ExemploClienteSOAP
* Iniciar o projeto
  >npm init <br>

* Para todos os quesitos confirme com enter
> package name: (ExemploServerREST) <br>
  version: (1.0.0) <br>
  description:<br>
  entry point: (index.js)<br>
  test command: <br>
  git repository: <br>
  keywords: <br>
  author: <br>
  license: (ISC) <br>

* Será gerado o arquivo _package.json_ 
* Instalar a biblioteca express
>npm install express
* verificar o arquivo package.json
* criar as pastas
>mkdir src <br> cd src <br> mkdir controllers <br> mkdir routes
  
* criar o arquivo server.js
```javascript
    const express = require('express');
    const cors = require('cors');
    const app = express();
    const PORT = 3010
    app.use(cors());
  
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.listen(PORT, function() {
       console.log('server initialized ' + PORT);
    });
  
    require('./src/routes/index')(app)
 ```

* criar o arquivo index.js na pasta routes
```javascript
    const SequenceRoute = require('./sequenceRoute')
    module.exports = (app) => {
        SequenceRoute(app)
    }
 ```
* criar o arquivo sequenceRoute.js na pasta routes
```javascript
  const SequenceRoute = require('../controllers/sequenceControler')
  module.exports = (app) => {
     app.post('/sequence', SequenceRoute.post);
     app.put('/sequence', SequenceRoute.put);
     app.delete('/sequence', SequenceRoute.delete);
     app.get('/sequence', SequenceRoute.get);
     app.get('/sequence/:id', SequenceRoute.getById);
  }
```

criar o arquivo sequenceControler.js na pasta controllers
```javascript
exports.post = (req, res, next) => {
    res.status(201).send('route POST!');
};

exports.put = (req, res, next) => {
    console.log(req.body)
    let id = req.body.id;
    res.status(201).send(`route PUT with ID! --> ${id}`);
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`route DELETE with ID! --> ${id}`);
};

exports.get = (req, res, next) => {
    res.status(200).send('route GET!');
};

exports.getById = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`route GET with ID! ${id}`);
};
```

* Para para iniciar o servidor execute o comando:
> node index.js

* Teste a API REST com o Postman
