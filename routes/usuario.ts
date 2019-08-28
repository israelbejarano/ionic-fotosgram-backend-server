import { Router, Request, Response} from 'express';
import { Usuario } from '../models/usuario.model';

const userRoutes = Router();

userRoutes.post('/create', (req: Request, res: Response) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
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