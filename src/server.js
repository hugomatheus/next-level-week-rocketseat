// servidor com express
const express = require("express")
const app = express()

// configurando pasta publica
app.use(express.static("public"))

// habilitar o uso do re.body
app.use(express.urlencoded({ extended:true}))

//template engine com nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: app,
  noCache: true
});

// importando arquivo de banco de dados
const db = require('./database/db')

// Como a configuração do nunjucks já passa o caminho das views não precisa o dirname e alterar de sendFile para render
app.get('/', function (req, res) {
  res.render("index.html")
})

app.get('/create-point', (req, res) => {
  //Pegar parametros de url
  //console.log(req.query)
  res.render("create-point.html")
})

app.post('/create-point', (req, res) => {
  //Pega os dados do form
  console.log(req.body)
  const query = `
          INSERT INTO places (
            image,
            name,
            address,
            number,
            complement,
            city,
            state,
            items
          ) VALUES (?,?,?,?,?,?,?,?);
      `
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.number,
    req.body.complement,
    req.body.city,
    req.body.state,
    req.body.items
  ]    
  let status = true;
  function afterInsert(err){
    if(err){
      console.log(err)
      status = false;
    }
    console.log('Cadastrado')
    console.log(this)
    res.render("create-point.html", {submit:true, status})
  }    
  
  db.run(query, values, afterInsert)
  
})

app.get('/search-results', (req, res) => {

  const search = req.query.search
  let query = "";
  if(search == ""){
    query = `SELECT * FROM places`
  }else{
    query = `SELECT * FROM places WHERE city LIKE '%${search}%'`
  }

  db.all(query, function(err, rows){
    if(err) {
      return console.log(err)
    }
    console.log(rows)
    const total = rows.length
    res.render("search-results.html", {places:rows, total})

  })
  
})
 

// Rotas sem utilizar nunjucks 
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + "/views/index.html")
// })

// app.get('/create-point', (req, res) => {
//   res.sendFile(__dirname + "/views/create-point.html")
// })

// app.post('/search-results', (req, res) => {
//   res.sendFile(__dirname + "/views/search-results.html")
// })

//ligar o servidor express
app.listen(3000)