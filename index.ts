import Server from './classes/server';
import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const server = new Server();

// body parse (middleware)
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// fileupload
server.app.use(fileUpload({useTempFiles: true}));

// activar el CORS
server.app.use(cors({origin: true, credentials: true}));


// rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// conectar BBDD
mongoose.connect('mongodb://localhost:27017/fotosgram', {useNewUrlParser: true, useCreateIndex: true}, (err) => {
    if (err) throw err;

    console.log('Base de datos ONLINE');
});

// levantar el servidor
server.start();