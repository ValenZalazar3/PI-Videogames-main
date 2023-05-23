const {Router} = require('express')
const router = Router();
const getGenres = require('../controllers/getGenresControllers')

router.get('/', async (req, res) => {
    const genres = await getGenres();
    try {
        return res.status(200).json(genres)
    } catch (error) {
        return res.status(404).json(error.message)
    }
})


module.exports = router;