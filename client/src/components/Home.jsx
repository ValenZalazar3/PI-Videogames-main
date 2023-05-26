import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteStates,
    getAllGames,
    filterGenres,
    getGamesByOrigin,
    getGenres,
    orderAlphabetically,
    orderByRating,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from './styles/Home.module.css'

export default function Home() {
    // PAGINADO
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres);

    // estados de la pagina
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPP] = useState(15);
    //logica de division del array por paginas
    const indexOfLastVideogame = currentPage * videogamesPP; // 1* 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPP; // 0
    const [current, setCurrent] = useState([]);

    useEffect(() => {
        dispatch(getGenres());
        const vg = allVideogames && allVideogames;
        if (vg.length === 0) {
            dispatch(getAllGames());
        }
        setCurrent(
            allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
        );
    }, [allVideogames, indexOfFirstVideogame, indexOfLastVideogame, dispatch]);

    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers);
    };


    function handleOrderAlphabetically(event) {
        event.preventDefault();
        dispatch(orderAlphabetically(event.target.value));
        setCurrentPage(1);
        setCurrent(
            allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
        );
    }

    function handleOrderRating(event) {
        event.preventDefault();
        dispatch(orderByRating(event.target.value));
        setCurrentPage(1);
        setCurrent(
            allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
        );
    }
    function handleFilterGenres(event) {
        event.preventDefault()
        dispatch(filterGenres(event.target.value))
        setCurrentPage(1)
        setCurrent(
            allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
        )
    }
    function handleGamesByOrigin(event) {
        event.preventDefault();
        dispatch(getGamesByOrigin(event.target.value));
        setCurrentPage(1);
        setCurrent(
            allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
        );
    }

    function ClearFilter(event) {
        dispatch(deleteStates());
    }


    return (<div className={styles.homeContainer}>
            <Link to="/createGame">
                <button className={styles.button}>Crear Video Juego</button>
            </Link>
            <SearchBar />
            <h1>VAMO A JUGA</h1>
            

            <div>
                <select onChange={(event) => handleOrderAlphabetically(event)}>
                    <option>Orden</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                </select>

                <select onChange={(event) => handleOrderRating(event)}>
                    <option>Rating</option>
                    <option value="max">Mas Popular</option>
                    <option value="min">Menos Popular</option>
                </select>

                <select onChange={(event) => handleFilterGenres(event)} defaultValue={'default'}>
                    <option value="default" disabled>Genres</option>
                    {genres?.map((el, i) => {
                        return (
                            <option key={i} value={el} >
                                {el}
                            </option>
                            
                        )
                    })

                    }
                </select>

                <select onClick={(event) => handleGamesByOrigin(event)}>
                    <option>Filter</option>
                    <option value="All">Todos los Games</option>
                    <option value="Created">Mis Games</option>
                    <option value="From Api">Api Games</option>
                </select>

                <button onClick={(event) => ClearFilter(event)} className={styles.button}>
                    Limpiar Filtros
                </button>

                <Paginado
                    videogamesPP={videogamesPP}
                    allVideogames={allVideogames.length}
                    paginado={paginado}
                />
                <div className={styles.container}>
                    {current.length > 0
                        ? current.map((el) => {
                            return (
                                <div key={el.id} className={styles.card}>
                                    <Card
                                        id={el.id}
                                        name={el.name}
                                        image={el.background_image}
                                        genres={
                                            isNaN(el.id)
                                                ? ''
                                                : el.genres.join(" - ")
                                        }
                                    />
                                </div>
                            );
                        })
                        : undefined}
                </div>
            </div>
        </div>
    );
}
