// Usei o express para  criar e configurar meu Servidor
const express = require("express");
const server = express();

const ideas = [
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Cursos de Programação",
    category: "Estudo",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Et, saepe suscipit sapiente vero voluptas necessitatibus ut quibusdam distinctio adipisci, repudiandae perspiciatis similique dolor voluptatem rem quasi, asperiores doloribus nemo officiis.",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    title: "Exercícios",
    category: "Saúde",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Et, saepe suscipit sapiente vero voluptas necessitatibus ut quibusdam distinctio adipisci, repudiandae perspiciatis similique dolor voluptatem rem oloribus nemo officiis.",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditação",
    category: "Mentalidade",
    description: " Lorem ipsum dolor sit amet consectetur adipisicing elit.Et, saepe suscipit sapiente vero voluptas necessitatibus ut quibusdam distinctio adipisci, repudiandae perspiciatis similique dolor voluptatem rem quasi, asperiores doloribus nemo officiis.",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
    title: "Karaokê",
    category: "Diversão em Familia",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Et, saepe suscipit sapiente vero voluptas necessitatibus ut quibusdam distinctio adipisci,repudiandae perspiciatis similique dolor voluptatem rem quasi, asperiores doloribus nemo officiis.",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2737/2737379.svg",
    title: "Video-game",
    category: "Distração",
    description: " Lorem ipsum dolor sit amet consectetur adipisicing elit.Et, saepe suscipit sapiente vero voluptas necessitatibus ut quibusdam distinctio adipisci, repudiandae perspiciatis similique dolor voluptatem rem quasi, asperiores doloribus nemo officiis.",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2737/2737393.svg",
    title: "Tocar Violão",
    category: "Diversão em Amigos",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Et, saepe suscipit sapiente vero voluptas necessitatibus ut quibusdam distinctio adipisci,repudiandae perspiciatis similique dolor voluptatem rem quasi, asperiores doloribus nemo officiis.",
    url: "https://rocketseat.com.br"
  },
]


// Configurando arquivos estáticos (CSS , SCRIPT, IMAGENS)
server.use(express.static("public"));

// Configurando nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true,
})

// Criei Rota de resposta e requisição
server.get("/", function (req, res){
  
  const reversedIdeas = [...ideas].reverse();
  
  let lastIdeas = []
  for ( idea of reversedIdeas) {
    if (lastIdeas.length < 2) {
      lastIdeas.push(idea)
    }
  }

  return res.render("index.html", { ideas: lastIdeas });
});

server.get("/ideias", function (req, res){
  const reversedIdeas = [...ideas].reverse()

  return res.render("ideias.html", { ideas: reversedIdeas});
});

// Servidor ligado na porta 3000
server.listen(3000);