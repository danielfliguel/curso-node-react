var express = require('express');
var app = express();

//Para permitir que o express insira dados via JSON
app.use(express.json());

const users = ['Daniel', 'João', 'Maria'];

//app.get('/', function (req, res) {
  //res.send("Hello World");
  /*Query Params: Para obter valores passados na url no seguinte formato www.bla.com?variavelObtida=x*/
  //const {nome} = req.query;  
  //return res.json({message: `Hello ${nome}`});
//})
//Route Params: Para obter valores passados da seguinte forma: www.bla.com/user/1:
app.get('/user', function (req, res){
   
   return res.json(users);
 })

 function checkUserExists(req, res, next){
   if (!req.body.name){
     return res.status(400).json({error: 'Username is required'});
   }
   return next();
 }

 function checkUserIdExists(req, res, next){
  if (!users[req.params.index]){
    return res.status(404).json({error: 'Username not found'});
  }
  return next();
}

 //CRUD

 //Método para inserir usuários no array. Sempre que uma requisição do tipo POST for realizada para a URL http://localhost.com/user, deverá 
 //ser informado um JSON com a chave name e o valor desejado -> {"name": "Fulano"}
 app.post('/user', checkUserExists, function (req, res){
  //req.body significa que name é igual ao valor que será passado no JSON -> {"name": "Daniel"}
  //Forma alternativa
  //const name = req.body.name
  const { name } = req.body;
  users.push(name);
  return res.json(users);
})


//Método PUT: alteração
 app.put('/user/:index', checkUserExists, checkUserIdExists, function (req, res){
  //index é o id informado na URL
  const { index } = req.params;
  //Name é o dado informado no JSON que será passado
  const { name } = req.body;
  //O valor do índice passado na URL será alterado para o informado no JSON


  users[index] = name;
  return res.json({message: `O usuário do índice ${index} teve o nome alterado para ${name}`});
})

app.delete('/user/:index', checkUserIdExists, function (req, res){

  const {index} = req.params;
  
  //Método que percorre o array até a posição do primeiro parâmetro e deleta o numéro de posições posterios equivalente ao valor do segundo parâmetro
  users.splice(index, 1);

  return res.json(users);

})


app.listen(80, function () {
  console.log('Example app listening on port 8080!');
});