const { Router } = require('express');
const routerGenres = require('../routes/routerGenres')
const routerGames = require('../routes/routerGames')

// Importar todos los routers;

// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/genres', routerGenres)
router.use('/videogames', routerGames)

module.exports = router;
