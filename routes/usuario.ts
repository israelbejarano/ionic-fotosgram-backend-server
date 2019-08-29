import { Router, Request, Response} from 'express';
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';

const userRoutes = Router();

// login
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;

    Usuario.findOne({email: body.email}, (err, userDB) => {
        if (err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña incorrectos'
            });
        }
        if (userDB.compararPassword(body.password)) {
            res.json({
                ok: true,
                token: 'asdasdadadadsd'
            });
        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña incorrectos ***'
            });
        }
    });
});

// crear usuario
userRoutes.post('/create', (req: Request, res: Response) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };

    // guardarlo en BBDD
    Usuario.create(user).then(userDB => {
        res.json({
            ok: true,
            user
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });


});

export default userRoutes;