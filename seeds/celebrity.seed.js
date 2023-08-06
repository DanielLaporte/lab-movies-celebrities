const mongoose = require('mongoose');
const Celebrity = require('./models/celebrity.model');

const celebrities = [
    { name: "Tom Cruise", occupation: "Actor", catchPhrase: "Show me the money!" },
    { name: "Beyonce", occupation: "Singer", catchPhrase: "All the single ladies!" },
    { name: "Daffy Duck", occupation: "Cartoon Character", catchPhrase: "You're despicable!" }
  ];

  mongoose
  .connect("mongodb://127.0.0.1:27017/lab-express-celebrities", { bufferCommands: false })
  .then(() => {
    console.log("Conexión exitosa a la base de datos.");

    // Función para inicializar la base de datos con las celebridades iniciales
    const seedDatabase = async () => {
      try {
        // Crear las celebridades en la base de datos utilizando el método create()
        const createdCelebrities = await Celebrity.create(celebrities);

        // Mostrar cuántas celebridades se han creado
        console.log(`${createdCelebrities.length} celebridades creadas.`);
      } catch (error) {
        // En caso de error, imprimir el mensaje de error
        console.error('Error al inicializar la base de datos:', error.message);
      } finally {
        // Cerrar la conexión con la base de datos al finalizar
        mongoose.connection.close();
      }
    };

    // Llamar a la función para inicializar la base de datos
    seedDatabase();
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });