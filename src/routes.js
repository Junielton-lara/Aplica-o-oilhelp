const express = require('express');
const { isAuth, auth } = require('./middlewares');

const router = express.Router();

const { User, Order } = require('./components');

//LOGIN
router.get('/login', (req, res) => {
    return res.render('login', { page: 'login' });
});

router.get('/logout', (req, res) => {
    res.clearCookie('isLogged');
    res.clearCookie('role');
    res.clearCookie('id');
    return res.redirect('login');
});

router.get('/error', (req, res) => {
    const logged = req.cookies['isLogged'];
    const erro = { code: 400, message: 'Bad Request' };
    return res.render('erro', { erro, logged });
});

router.post('/login', async (req, res) => {
    const user = await User.Service.login(req);
    const logged = req.cookies['isLogged'];
    if(user != null) {
        res.cookie('isLogged', 'true');
        res.cookie('role', user.role);
        res.cookie('id', user.id);
        return res.redirect('/');
    }
    const erro = { code: 400, message: 'Bad Request' };
    return res.render('erro', { erro, logged });
});

//CADASTRO
router.get('/cadastrar', (req, res) => {
    return res.render('signup', { page: 'signup' });
});

router.post('/cadastrar', async (req, res) => {
    const logged = req.cookies['isLogged'];
    const user = await User.Service.save(req);
    if(user != null) {
        res.cookie('isLogged', true);
        res.cookie('role', user.role);
        res.cookie('id', user.id);
        return res.redirect('/');
    }
    const erro = { code: 400, message: 'Bad Request' };
    return res.render('erro', { erro, logged });
});

//PAGINAS
router.get('/', isAuth, async (req, res) => {
    const role = req.cookies['role'];
    const id = req.cookies['id'];
    const logged = req.cookies['isLogged'];
    const donations = await Order.Service.getAllDonations();
    if(donations != null) {
        return res.render('index', { page: 'index', role, id, donations });
    }
    const erro = { code: 400, message: 'Bad Request' };
    return res.render('erro', { erro, logged });
});

router.get('/mais-informacoes', isAuth, async (req, res) => {
    const role = req.cookies['role'];
    const id = req.cookies['id'];
    return res.render('info', { page: 'info', role, id });

});

router.get('/perfil', isAuth, async (req, res) => {
    const role = req.cookies['role'];
    const id = req.cookies['id'];
    const user = await User.Service.getOne(id);
    const logged = req.cookies['isLogged'];
    if(user != null) {
        return res.render('perfil', { page: 'perfil', role, id, user });
    }
    const erro = { code: 400, message: 'Bad Request' };
    return res.render('erro', { erro, logged });
});

router.post('/perfil/atualizar', isAuth, async (req, res) => {
    const role = req.cookies['role'];
    const id = req.cookies['id'];
    const user = await User.Service.update(req, id);
    const logged = req.cookies['isLogged'];
    if(user != null) {
        return res.redirect('/');
    }
    const erro = { code: 400, message: 'Bad Request' };
    return res.render('erro', { erro, logged });
});

router.get('/minhas-doacoes', isAuth, async (req, res) => {
    const role = req.cookies['role'];
    const id = req.cookies['id'];
    const logged = req.cookies['isLogged'];
    const donations = await Order.Service.getMyDonations(id);
    if(donations != null) {
        return res.render('donations', { page: 'donations', role, id, donations });
    }
    const erro = { code: 400, message: 'Bad Request' };
    return res.render('erro', { erro, logged });
});

router.get('/minhas-coletas', isAuth, async (req, res) => {
    const role = req.cookies['role'];
    const id = req.cookies['id'];
    const logged = req.cookies['isLogged'];
    const donations = await Order.Service.getMyCollects(id);
    if(donations != null) {
        return res.render('collects', { page: 'collects', role, id, donations });
    }
    const erro = { code: 400, message: 'Bad Request' };
    return res.render('erro', { erro, logged });
});


//DOAR
router.get('/doar', isAuth, async (req, res) => {
    const role = req.cookies['role'];
    const id = req.cookies['id'];
    return res.render('donate', { page: 'donations', role, id });
});

router.post('/doar', isAuth,  async (req, res) => {
    const id = req.cookies['id'];
    const logged = req.cookies['isLogged'];
    const order = await Order.Service.donate(req, id);
    if(order != null) {
        return res.redirect('/');
    }
    const erro = { code: 400, message: 'Bad Request' };
    return res.render('erro', { erro, logged });
});

// COLETAR
router.post('/doacao/:id/aceitar', isAuth,  async(req, res) => {
    const id = req.cookies['id'];
    const logged = req.cookies['isLogged'];
    const accept = await Order.Service.accept(req.params.id, id);
    if(accept != null) {
        return res.redirect('/');
    }
    const erro = { code: 400, message: 'Bad Request' };
    return res.render('erro', { erro, logged });
});

router.post('/doacao/:id/concluir', isAuth,  async(req, res) => {
    const complete = await Order.Service.complete(req.params.id);
    const logged = req.cookies['isLogged'];
    if(complete != null) {
        return res.redirect('/');
    }
    const erro = { code: 400, message: 'Bad Request' };
    return res.render('erro', { erro, logged });
});

module.exports = router;