const express = require('express');
const path = require("path");
const jsonDiscos = require("./discos.json");
const app = express();
const exphbs  = require('express-handlebars');
const PORT = 3001;

/*** Configuración de Handlebars para Express ***/
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main", //
      layoutsDir: "views/layouts", //contiene las plantillas
    })
  ); //configuro un motor de plantillas. el motor se llama "handlebars" y utilizamos el modulo exphbs
  app.set("view engine", "handlebars"); //indico el motor de plantillas que vamos a estar usando
  app.set("views", path.join(__dirname, "views"));

/**************************************************/

// carpeta de recursos estaticos
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
/**************************************************/

app.get('/',  (req, res) => {
    res.render('home', {
        titulo: 'HOME',
        labelInput: 'Ingrese su Disco Favorito',
    });
});

app.get('/grilla' , (req, res) => {
    let results = jsonDiscos.discos
    const { artist, title, launch } = req.query

    if (title) {
        results = results.filter((element) => element.titulo.toLowerCase().includes(title.toLowerCase()))
    }
    if (artist) {
        results = results.filter((element) => element.artista.toLowerCase().includes(artist.toString().toLocaleLowerCase()));
    }
    if (launch) {
        results = results.filter((element) => element.lanzamiento.toString() == launch);
    }

    console.log(title);
    console.log(artist);
    console.log(launch);

    console.log(results);

    res.render('grilla', {
        discos: results,
    });
})
app.get('/disco', (req,res) => {
    let results = jsonDiscos.discos
    const disco = results.find((disco) => disco.id == req.query.id);

    res.render('disco', {
        disco,
        titulo: `Titulo del disco: ${disco.titulo}`,
    });
})

app.listen(3000);