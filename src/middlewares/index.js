const { User } = require('../components');
const localStorage = require('node-localstorage').LocalStorage('./storage');

module.exports = {
    auth: (req, res, next) => {
        if (req.session.user && req.cookies.user_sid) {
            res.redirect('/');
        } else {
            next();
        }    
    },
    isAuth: (req, res, next) => {
        if(req.cookies['isLogged'] == 'true') {
            req.role = req.cookies['role'];
            req.id = req.cookies['id'];
            return next();
        }
        return res.redirect('/error');
    },
}