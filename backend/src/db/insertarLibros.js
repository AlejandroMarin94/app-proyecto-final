require("dotenv").config();
const mongoose = require("mongoose");
const bookModel = require("./src/models/bookModel");

const librosApp = [
  // HARRY POTTER
  {
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    fechaPublicacion: "1997",
    rating: 4.8,
    descripcion:
      "Un niño huérfano descubre que es mago y entra en un mundo de magia, amistad y peligro.",
    categoria: "Fantasía",
    isbn: "9788478884452",
    cover: "https://covers.openlibrary.org/b/isbn/9788478884452-L.jpg",
  },
  {
    titulo: "Harry Potter y la cámara secreta",
    autor: "J.K. Rowling",
    fechaPublicacion: "1998",
    rating: 4.7,
    descripcion:
      "En su segundo año en Hogwarts, extraños ataques revelan un antiguo secreto oculto en la escuela.",
    categoria: "Fantasía",
    isbn: "9788478884957",
    cover: "https://covers.openlibrary.org/b/isbn/9788478884957-L.jpg",
  },
  {
    titulo: "Harry Potter y el prisionero de Azkaban",
    autor: "J.K. Rowling",
    fechaPublicacion: "1999",
    rating: 4.9,
    descripcion:
      "Un peligroso fugitivo escapa de Azkaban y parece tener una conexión directa con Harry.",
    categoria: "Fantasía",
    isbn: "9788478885190",
    cover: "https://covers.openlibrary.org/b/isbn/9788478885190-L.jpg",
  },
  {
    titulo: "Harry Potter y el cáliz de fuego",
    autor: "J.K. Rowling",
    fechaPublicacion: "2000",
    rating: 4.9,
    descripcion:
      "Harry participa en un torneo mágico mortal que marcará un antes y un después en el mundo mágico.",
    categoria: "Fantasía",
    isbn: "9788478886463",
    cover: "https://covers.openlibrary.org/b/isbn/9788478886463-L.jpg",
  },
  {
    titulo: "Harry Potter y la Orden del Fénix",
    autor: "J.K. Rowling",
    fechaPublicacion: "2003",
    rating: 4.8,
    descripcion:
      "Mientras el Ministerio niega el regreso de Voldemort, Harry y sus amigos se organizan en secreto.",
    categoria: "Fantasía",
    isbn: "9788478887422",
    cover: "https://covers.openlibrary.org/b/isbn/9788478887422-L.jpg",
  },

  // LOS JUEGOS DEL HAMBRE
  {
    titulo: "Los juegos del hambre",
    autor: "Suzanne Collins",
    fechaPublicacion: "2008",
    rating: 4.8,
    descripcion:
      "Katniss Everdeen se ofrece voluntaria para sustituir a su hermana en un mortal espectáculo televisado.",
    categoria: "Distopía",
    isbn: "9788498675399",
    cover: "https://covers.openlibrary.org/b/isbn/9788498675399-L.jpg",
  },

  // LA GUERRA DE LA AMAPOLA
  {
    titulo: "La guerra de la amapola",
    autor: "R.F. Kuang",
    fechaPublicacion: "2018",
    rating: 4.7,
    descripcion:
      "Una huérfana pobre entra en una prestigiosa academia militar y descubre un poder devastador.",
    categoria: "Fantasía oscura",
    isbn: "9780062662569",
    cover: "https://covers.openlibrary.org/b/isbn/9780062662569-L.jpg",
  },
  {
    titulo: "La república del dragón",
    autor: "R.F. Kuang",
    fechaPublicacion: "2019",
    rating: 4.8,
    descripcion:
      "Rin se ve atrapada entre potencias en guerra mientras busca venganza y poder.",
    categoria: "Fantasía oscura",
    isbn: "9780062662637",
    cover: "https://covers.openlibrary.org/b/isbn/9780062662637-L.jpg",
  },
  {
    titulo: "La dinastía de la luz",
    autor: "R.F. Kuang",
    fechaPublicacion: "2020",
    rating: 4.8,
    descripcion:
      "El conflicto alcanza su clímax en una guerra que redefine el destino del continente.",
    categoria: "Fantasía oscura",
    isbn: "9780062662644",
    cover: "https://covers.openlibrary.org/b/isbn/9780062662644-L.jpg",
  },

  // CLÁSICOS Y OTROS
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    fechaPublicacion: "1967",
    rating: 4.9,
    descripcion:
      "La historia de la familia Buendía en el mítico pueblo de Macondo, llena de realismo mágico.",
    categoria: "Realismo mágico",
    isbn: "9780307474728",
    cover: "https://covers.openlibrary.org/b/isbn/9780307474728-L.jpg",
  },

  {
    titulo: "El nombre del viento",
    autor: "Patrick Rothfuss",
    fechaPublicacion: "2007",
    rating: 4.8,
    descripcion:
      "Kvothe narra su vida, desde su infancia en una troupe itinerante hasta su fama como mago.",
    categoria: "Fantasía",
    isbn: "9788499082479",
    cover: "https://covers.openlibrary.org/b/isbn/9788499082479-L.jpg",
  },
  {
    titulo: "Juego de tronos",
    autor: "George R.R. Martin",
    fechaPublicacion: "1996",
    rating: 4.8,
    descripcion:
      "Nobles casas luchan por el Trono de Hierro mientras una amenaza antigua despierta en el norte.",
    categoria: "Fantasía épica",
    isbn: "9788496208513",
    cover: "https://covers.openlibrary.org/b/isbn/9788496208513-L.jpg",
  },

  {
    titulo: "El nombre de la rosa",
    autor: "Umberto Eco",
    fechaPublicacion: "1980",
    rating: 4.7,
    descripcion:
      "Un monje franciscano investiga una serie de muertes misteriosas en una abadía medieval.",
    categoria: "Misterio histórico",
    isbn: "9788497596824",
    cover: "https://covers.openlibrary.org/b/isbn/9788497596824-L.jpg",
  },
  {
    titulo: "La ladrona de libros",
    autor: "Markus Zusak",
    fechaPublicacion: "2005",
    rating: 4.8,
    descripcion:
      "Una niña encuentra consuelo en los libros durante la Alemania nazi.",
    categoria: "Ficción histórica",
    isbn: "9780307476319",
    cover: "https://covers.openlibrary.org/b/isbn/9780307476319-L.jpg",
  },
  {
    titulo: "El psicoanalista",
    autor: "John Katzenbach",
    fechaPublicacion: "2002",
    rating: 4.6,
    descripcion:
      "Un psicoanalista recibe una amenaza que lo obliga a descubrir la identidad de su acosador.",
    categoria: "Thriller psicológico",
    isbn: "9788497930192",
    cover: "https://covers.openlibrary.org/b/isbn/9788497930192-L.jpg",
  },
  {
    titulo: "El código Da Vinci",
    autor: "Dan Brown",
    fechaPublicacion: "2003",
    rating: 4.5,
    descripcion:
      "Un profesor de simbología se ve envuelto en una conspiración relacionada con el Santo Grial.",
    categoria: "Thriller",
    isbn: "9780307474278",
    cover: "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg",
  },

  {
    titulo: "El alquimista",
    autor: "Paulo Coelho",
    fechaPublicacion: "1988",
    rating: 4.6,
    descripcion:
      "Un joven pastor emprende un viaje espiritual en busca de su leyenda personal.",
    categoria: "Ficción espiritual",
    isbn: "9780061122415",
    cover: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
  },
  {
    titulo: "Reina roja",
    autor: "Juan Gómez-Jurado",
    fechaPublicacion: "2018",
    rating: 4.8,
    descripcion:
      "Una mente prodigiosa y un inspector deben resolver un secuestro imposible.",
    categoria: "Thriller",
    isbn: "9788466664417",
    cover: "https://covers.openlibrary.org/b/isbn/9788466664417-L.jpg",
  },

  {
    titulo: "Rey blanco",
    autor: "Juan Gómez-Jurado",
    fechaPublicacion: "2020",
    rating: 4.8,
    descripcion:
      "El enemigo más peligroso de Antonia Scott regresa para un último enfrentamiento.",
    categoria: "Thriller",
    isbn: "9788466668545",
    cover: "https://covers.openlibrary.org/b/isbn/9788466668545-L.jpg",
  },
  {
    titulo: "El silencio de los corderos",
    autor: "Thomas Harris",
    fechaPublicacion: "1988",
    rating: 4.7,
    descripcion:
      "Una joven agente del FBI busca la ayuda de Hannibal Lecter para atrapar a un asesino serial.",
    categoria: "Thriller psicológico",
    isbn: "9788497593793",
    cover: "https://covers.openlibrary.org/b/isbn/9788497593793-L.jpg",
  },
  {
    titulo: "El retrato de Dorian Gray",
    autor: "Oscar Wilde",
    fechaPublicacion: "1890",
    rating: 4.6,
    descripcion:
      "Un joven mantiene su belleza mientras su retrato envejece y revela su corrupción.",
    categoria: "Clásico",
    isbn: "9788491050292",
    cover: "https://covers.openlibrary.org/b/isbn/9788491050292-L.jpg",
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    fechaPublicacion: "1949",
    rating: 4.8,
    descripcion:
      "Un hombre lucha contra un régimen totalitario que controla cada aspecto de la vida.",
    categoria: "Distopía",
    isbn: "9788499890944",
    cover: "https://covers.openlibrary.org/b/isbn/9788499890944-L.jpg",
  },

  {
    titulo: "El cuento de la criada",
    autor: "Margaret Atwood",
    fechaPublicacion: "1985",
    rating: 4.7,
    descripcion:
      "Una mujer vive sometida en una teocracia que controla la reproducción.",
    categoria: "Distopía",
    isbn: "9788497592581",
    cover: "https://covers.openlibrary.org/b/isbn/9788497592581-L.jpg",
  },
  {
    titulo: "El marciano",
    autor: "Andy Weir",
    fechaPublicacion: "2011",
    rating: 4.8,
    descripcion:
      "Un astronauta queda atrapado en Marte y debe sobrevivir con recursos limitados.",
    categoria: "Ciencia ficción",
    isbn: "9781101905005",
    cover: "https://covers.openlibrary.org/b/isbn/9781101905005-L.jpg",
  },
  {
    titulo: "Dune",
    autor: "Frank Herbert",
    fechaPublicacion: "1965",
    rating: 4.8,
    descripcion:
      "Un joven se convierte en líder en un planeta desértico donde se produce la especia más valiosa del universo.",
    categoria: "Ciencia ficción",
    isbn: "9780441172719",
    cover: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
  },

  {
    titulo: "El juego de Ender",
    autor: "Orson Scott Card",
    fechaPublicacion: "1985",
    rating: 4.7,
    descripcion:
      "Un niño prodigio es entrenado para liderar la defensa de la humanidad.",
    categoria: "Ciencia ficción",
    isbn: "9780812550702",
    cover: "https://covers.openlibrary.org/b/isbn/9780812550702-L.jpg",
  },
  {
    titulo: "El niño con el pijama de rayas",
    autor: "John Boyne",
    fechaPublicacion: "2006",
    rating: 4.6,
    descripcion:
      "La amistad entre dos niños separados por una alambrada en plena Segunda Guerra Mundial.",
    categoria: "Ficción histórica",
    isbn: "9788498380798",
    cover: "https://covers.openlibrary.org/b/isbn/9788498380798-L.jpg",
  },
];

const insertarLibros = async () => {
  try {
    const URL_MONGODB = process.env.URL_MONGODB;
    await mongoose.connect(URL_MONGODB);

    await bookModel.deleteMany({});

    const resultado = await bookModel.insertMany(librosApp);

    await mongoose.disconnect();
  } catch (error) {
    console.error(" Error al insertar libros:", error.message);
  }
};

insertarLibros();
