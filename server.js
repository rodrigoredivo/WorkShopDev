// Usei o express para  criar e configurar meu Servidor
const express = require("express");
const server = express();

const db = require("./db");

// Configurando arquivos estáticos (CSS , SCRIPT, IMAGENS)
server.use(express.static("public"));

//Habilitar uso do req.body
server.use(express.urlencoded({ extended: true }));

// Configurando nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true,
})

// Criei Rota de resposta e requisição
server.get("/", function (req, res){

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    const reversedIdeas = [...rows].reverse();
  
    let lastIdeas = []
    for ( idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea)
      }
    }
  
    return res.render("index.html", { ideas: lastIdeas });

  })

});

server.get("/ideias", function (req, res){

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    const reversedIdeas = [...rows].reverse()
    return res.render("ideias.html", { ideas: reversedIdeas});

  })


});

server.post("/", function (req, res){
  // INSERIR DADOS NA TABELA
  const query = `
    INSERT INTO ideas (
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
  `

  const data = req.body;

  const values = [
    data.image,
    data.title,
    data.category,
    data.description,
    data.link
  ]

  db.run(query, values, function(err) {
    if (err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    return res.redirect("/ideias");
  })

});

// Servidor ligado na porta 3000
server.listen(3000);