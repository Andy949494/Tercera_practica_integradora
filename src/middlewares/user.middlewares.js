import { validateToken } from "../utils/validations.utils.js";


const isUserOrTokenValid = (req, res, next) => {
    if(req.user) {
        return next();
    }

    const authToken = req.headers.authorization;
    const checkToken = validateToken(authToken);

    if(checkToken) {
        return next();
    }

    return res.status(401).send("No autorizado!");
}

const checkRol = (req, res, next) => {
    const roles = ['user', 'admin', 'premium'];
    const rolUser = req.body.rol.tolowercase();

    const isRolValid = roles.includes( el => rolUser === el);

    if(isRolValid) {
        next();
    } else {
        req.body.rol = 'user';
        next();
    }
}

const isAdmin = (req, res, next) => {
    const isAdmin = req.user.rol;
    if(!isAdmin) {
        return res.status(401).send("Not authorized!");
    }

    next();
}

export {
    isUserOrTokenValid,
    checkRol,
    isAdmin
}