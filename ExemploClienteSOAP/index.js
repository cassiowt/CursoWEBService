
var soap = require('soap');
var url1 = 'http://www.gcomputer.net/webservices/dilbert.asmx?wsdl';
soap.createClient(url1, function(err, client) {
    client.DailyDilbert({ ADate: "2022-06-02" }, function(err, result) {
        if(err) return console.log(err);
    });
    console.log("DESCRIBE -->  ", client.describe().Dilbert.DilbertSoap);
});
var url = 'http://www.dneonline.com/calculator.asmx?wsdl';
soap.createClient(url, function(err, client) {
    client.Add({intA: 2, intB: 3}, function (err, result) {
        if (err) return console.log(err);
        console.log("SOMA: ", result.AddResult);
    });
   client.Divide({ intA: 2, intB:3}, function(err, result) {
        if(err) return console.log(err);
        console.log("DIVISÃO: ", result.DivideResult);
    });
   client.Multiply({ intA: 2, intB:3}, function(err, result) {
        if(err) return console.log(err);
        console.log("MULTIPLICAÇÃO: ", result.MultiplyResult);
    });
   client.Subtract({ intA: 2, intB:3}, function(err, result) {
        if(err) return console.log(err);
        console.log("SUBTRAÇÃO: ", result.SubtractResult);
    });
    console.log("conteudo SOAP", client.lastRequest)
    console.log("DESCRIBE -->  ", client.describe().Calculator.CalculatorSoap);
});
