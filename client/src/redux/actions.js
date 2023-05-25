import axios from "axios";
import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    GET_GENRES,
    ORDER_ALPHABETICALLY,
    ORDER_BY_RATING,
    FILTER_BY_GENRES,
    GET_VIDEOGAMES_BY_ORIGIN,
    GET_VIDEOGAMES_BY_NAME,
    DELETED_GAME,
    DELETE_STATES,
    DELETE_DETAIL,
} from "./actionTypes";

export const getAllGames = () => {
    return async function (dispatch) {
        let response = await axios(`http://localhost:3001/videogames`);
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: response.data,
        });
    };
};

export const getDetailVideogame = (id) => {
    return async function (dispatch) {
        try {
            let response = await axios(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: GET_VIDEOGAME_BY_ID,
                payload: response.data,
            });
        } catch (error) {
            return {
                error: "No hay detalles",
                originalError: error,
            };
        }
    };
};

export const createVideogame = (payload) => {
    return async function (dispatch) {
        try {
            let { name, image, description, released, rating, platforms, genres } =
                payload;
            let response = await axios.post(`http://localhost:3001/videogames`, {
                name,
                image,
                description,
                released: new Date(released),
                rating,
                platforms,
                genres,
            });
            return dispatch(response);
        } catch (error) {
            return {
                error: "No se pudo crear el Juego",
                originalError: error,
            };
        }
    };
};

export const getGenres = (payload) => {
    return async function (dispatch) {
        try {
            let response = await axios(`http://localhost:3001/genres`, payload);
            return dispatch({
                type: GET_GENRES,
                payload: response.data,
            });
        } catch (error) {
            return {
                error: "No hay generos",
                originalError: error,
            };
        }
    };
};

export const orderAlphabetically = (payload) => {
    return {
        type: ORDER_ALPHABETICALLY,
        payload
    }
}

export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

export const filterGenres = (payload) => {
    return {
        type: FILTER_BY_GENRES,
        payload
    }
}


export const getGamesByOrigin = (payload) => {
    return {
        type: GET_VIDEOGAMES_BY_ORIGIN,
        payload
    }
}

export const getGamesByName = (name) => {
    return async function (dispatch) {
        try {
            let response = await axios(`http://localhost:3001/videogames/name?name=${name}`)
            return dispatch({
                type: GET_VIDEOGAMES_BY_NAME,
                payload: response.data
            })
        } catch (error){
            return{
                error: 'No se encontraron Juegos con ese nombre',
                originalError: error.message
            }
        }
    }
}

export const deleteGame = (id) => {
    return async function (dispatch){
        try {
            console.log(id)
            let response = await axios.delete(`http://localhost:3001/videogames/${id}`)
            return dispatch ({
                type: DELETED_GAME,
                payload: response.data
            })
        } catch(error) {
            return{
                error: 'No se pudo eliminar el Juego',
                originalError: error
            }
        }
    }
}

export const deleteStates = () => {
    return async function (dispatch) {
        return dispatch ({
            type: DELETE_STATES
        })
    }
}

export const deleteDetail = () => {
    return {
            type: DELETE_DETAIL
        }
    }


export const searchGameByPlatforms = () => { }
export const modifyVideoGame = (payload) => { }