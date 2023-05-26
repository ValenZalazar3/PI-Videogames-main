const { Videogame, Genre, Op, sequelize } = require('../db');
const axios = require ('axios');
require("dotenv").config();
const {API_KEY } = process.env


const getGamesDb = async () => {
    const response = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
    const data = await response.map(resp => resp.toJSON())
    const videogames = data.map(game => {
        const genres = game.Genre?.map(genre => genre.name)
        return {
            id: game.id,
            createdInDb: game.createdInDb,
            name: game.name,
            description: game.description.replace(/<\/?[^>]+>/gi, " "),
            background_image: game.image,
            platforms: game.platforms,
            genres: genres,
            rating: game.rating,
        }
    })
    
    return videogames;
}



const getGamesApi = async () => {
    const videogames = [];
    let page = 1;
    console.log("Bucando juegos...");
    while (page < 6) {
        // const response = await axios(`http://localhoist:3001/videogames/key=${API_KEY}&page=${page}`)
        const response = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`)
        const data = response.data.results;
        const videogamesByPage = data.map(game => {
            const genres = game.genres.map(genre => genre.name);
            return ({
                id: game.id,
                name: game.name,
                background_image: game.background_image,                
                genres: genres,
                rating: game.rating,
            })        
        })
        videogamesByPage.forEach(game => {
            videogames.push(game);
        });
        page++;
    }
    console.log(videogames.length);
    return videogames;
}



const getAllGames = async () => {
    const baseDataGames = await getGamesDb();
    const apiGames = await getGamesApi();

    return  [...apiGames, ...baseDataGames]

}


const getGameByName = async (name) => {
    console.log("Searching in DATABASE...");
    const videogamesDB = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: `${name}`,
            },
        },
    }, {
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });

    //console.log("Searching in API...");

    try {
        // const response = await axios(`http://localhost:3001/videogames/search=${name}&key=${API_KEY}`);
        const response = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        const videogamesApi = [];
        for (let i = 0; i < 15; i++) {
            const data = response.data.results[i];
            const platforms = data.platforms.map(obj => obj.platform.name);
            const genres = data.genres.map(obj => obj.name);
            const videogame = {
                
                id: data.id,
                name: data.name,
                background_image: data.background_image ? data.background_image : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
                platforms: platforms,
                description: data.description ? data.description.replace(/<\/?[^>]+>/gi, " ") : "No description",
                released: data.released,
                genres: genres
            }
            videogamesApi.push(videogame);
        }
        if (videogamesDB.length && videogamesApi.length) {
            const allGames = videogamesDB.concat(videogamesApi).slice(0, 15);
            return allGames;
        }
        if (videogamesDB.length) return videogamesDB;
        if (videogamesApi.length) return videogamesApi;

    } catch (error) {
        return error.message
    }
}


const getGamesById = async (id) => {
    if(isNaN(id)){
        let idDb = await Videogame.findOne({
            where: {
                id: id,
            },
            include:{
                model: Genre,
                attributes:['name'],
                throgh: {
                    attributes: []
                }
            }
        });
        if(!idDb){
            throw new Error('No se ha encontrado juego con el ID enviado')
        }
        return idDb
    }else{
        const findId = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        return {
            id: findId.data.id,
            name: findId.data.name,
            description: findId.data.description.replace(/<\/?[^>]+>/gi, " "),
            released: findId.data.released,
            rating: findId.data.rating,
            img: findId.data.background_image,
            platforms: findId.data.platforms.map((p) => p.platform.name),
            genres: findId.data.genres.map((g) => g.name),
        }
    }
}


// name, image, rating, released, description, genero
const createGame = async (inputData) => {
  let transaction = null;

  try {
    // Busca si ya existe un juego con el mismo título
    const existingGame = await Videogame.findOne({
      where: { name: inputData.name },
    });
    if (existingGame) {
      throw new Error("Recipe title already exists.");
    }

    // Inicia la transacción
    transaction = await sequelize.transaction();

    // Crea el nuevo juego en la base de datos
    const newGame = await Videogame.create({ ...inputData }, { transaction });

    // Agrega los tipos de juegos relacionados a la receta
    for (const genreName of inputData.genres) {
        console.log(genreName);
    const genre = await Genre.findOne({ where: { name: genreName } })
    await newGame.addGenre(genre, { transaction });
    }

    // Confirma la transacción
    await transaction.commit();
    console.log(newGame)
    return newGame;
} catch (error) {
    // Si ocurre algún error, deshace la transacción
    if (transaction) {
    await transaction.rollback();
    }

    throw error;
  }
};



module.exports ={
    getGamesDb,
    getGamesApi,
    getAllGames,
    getGameByName,
    getGamesById,
    createGame,

}