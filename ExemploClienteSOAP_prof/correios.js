var soap = require('soap')
var url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl'

soap.createClient(url, function (err, client){
    if(err){
        console.log(err)
    } else {
       client.consultaCEP({
           cep: '91520260'
       }, (err, res) => {
           console.log(res)
       })
    }
    console.log('DESCRIBE -->', client.describe().AtendeClienteService.AtendeClientePort )
});
