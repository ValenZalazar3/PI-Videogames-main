import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, createVideogame } from "../redux/actions";

const CreateGame = () => {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const platforms = [
        "PC",
        "PlayStation 5",
        "Xbox One",
        "PlayStation 4",
        "Xbox Series S/X",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo 3DS",
        "Nintendo DS",
        "Nintendo DSi",
        "macOS",
        "Linux",
        "Xbox 360",
        "Xbox",
        "PlayStation 3",
        "PlayStation 2",
        "PlayStation",
        "PS Vita",
        "PSP",
        "Wii U",
        "Wii",
        "GameCube",
        "Nintendo 64",
        "Game Boy Advance",
        "Game Boy Color",
        "Game Boy",
        "SNES",
        "NES",
        "Classic Macintosh",
        "Apple II",
        "Commodore / Amiga",
        "Atari 7800",
        "Atari 5200",
        "Atari 2600",
        "Atari Flashback",
        "Atari 8-bit",
        "Atari ST",
        "Atari Lynx",
        "Atari XEGS",
        "Genesis",
        "SEGA Saturn",
        "SEGA CD",
        "SEGA 32X",
        "SEGA Master System",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
    ];
    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        genres: [],
    });

    //-----------------------------VALIDACIONES----------------------------------

    const validators = (values) => {
        let errors = {};
        if (!values.name || values.name.length < 3) {
            errors.name = "* El nombre del juego debe tener al menos 3 caracteres...";
        }

        if (!values.description) {
            errors.description =
                "* Por favor ingresa una descripcion. (Max 100 caracteres)";
        }
        if (!values.rating || values.rating === "0") {
            errors.rating = "* Por favor inserte un numero entre el 0.5 y 5";
        }
        if (!values.released) {
            errors.released = "*Por favor inserta una fecha de lanzamiento";
        }
        if (values.platforms.length === 0) {
            errors.platforms = "*Por favor selecciona al menos una Plataforma";
        }
        if (!values.genres) {
            errors.genres = "*Por favor selecciona al menos un genero";
        }
        return errors;
    };

    // Funcion que se ejecuta cunado hay un cambio, mediante un event.
    const handleChange = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
        setErrors(
            validators({
                ...values,
                [event.target.name]: event.target.value,
            })
        );
    };

    //--------------------------SUBMIT--------------------------

    const handleSubmit = (event) => {
        event.preventDefault();
        if (values.image === null || values.image === " ") {
            values.image =
                "https://media.rawg.io/media/games/53f/53f65f1a0988374c18b5ee3dddbf0399.jpg";
        }
        if (
            !values.name ||
            !values.description ||
            !values.rating ||
            !values.released ||
            !values.platforms ||
            !values.genres
        ) {
            alert("Informacion del Formulario perdida");
        } else {
            dispatch(createVideogame(values));
            alert("Videogame Created");
            setValues({
                name: "",
                image: "",
                description: "",
                released: "",
                rating: 0,
                platforms: [],
                genres: [],
            });
        }
    };

    const handleChangePlatform = (event) => {
        if (values.platforms.includes(event.target.value)) {
            alert(
                "Esta plataforma ya ha sido seleccionada. Elija otra, por favor..."
            );
        } else {
            setValues((state) => ({
                ...state,
                platforms: [...state.platforms, event.target.value],
            }));
        }
    };

    const handleDeletePlatform = (event, plat) => {
        event.preventDefault();
        setValues({
            ...values,
            platforms: values.platforms.filter((element) => element !== plat),
        });
    };

    const handleChangeGenre = (event) => {
        if (values.genres.includes(event.target.value)) {
            alert("Este genero ya ha sido seleccionado, por favor elija otro...");
        } else {
            setValues((state) => ({
                ...state,
                genres: [...state.genres, event.target.value],
            }));
        }
    };

    const handleDeleteGenre = (event, genr) => {
        event.preventDefault();
        setValues((prev) => ({
            ...prev,
            genres: prev.genres.filter((element) => element !== genr),
        }));
    };

    return (
        <div>
            <div>
                <h1>Crear Video Juego</h1>
                <h4>Completa el formulario</h4>
                <form autoComplete="off" onSubmit={(event) => handleSubmit(event)}>

                    {/*-------------------------------------NOMBRE------------------*/}
                    <div>
                        <h5>Nombre del Video Juego</h5>
                        <input
                            type="text"
                            placeholder="Nombre..."
                            name="name" // Nombre del input
                            value={values.name} // Valor dinamico que se actualiza mientras el usuario escribe
                            onChange={(event) => handleChange(event)} // Funcion que es "destructor" se ejecuta cunado se produce el evento.
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    {/*-------------------------------------IMAGEN------------------*/}
                    <div>
                        <h5>Imagen del Juego:</h5>
                        <input
                            type="text"
                            placeholder="URL de la imagen"
                            name="image"
                            value={values.image}
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    {/*------------------------------DESCRIPCION------------------*/}
                    <div>
                        <h5>Descripcion del juego:</h5>
                        <input
                            type="text"
                            placeholder="Descripcion..."
                            name="description"
                            maxLength="100"
                            value={values.description}
                            onChange={(event) => handleChange(event)}
                        />
                        {errors.description && <p>{errors.description}</p>}
                    </div>
                    {/*--------------------------- FECHA DE LANZAMIENTO------------------*/}
                    <div>
                        <h5>Fecha de lanzamiento</h5>
                        <input type="date"
                            placeholder="Fecha..."
                            name="released"
                            value={values.released}
                            onChange={(event) => handleChange(event)}
                        />
                        {errors.released && (
                            <p>{errors.released}</p>
                        )}
                        </div>
                        {/* --------------------------------------RATING---------------------------------------- */}
                        <div>
                            <h5>Rating:</h5>
                            <input
                                
                                type="number"
                                placeholder="Rating..."
                                value={values.rating}
                                name="rating"
                                step={0.5}
                                max={5.0}
                                min={0.0}
                                onChange={(event) => {
                                    handleChange(event);
                                }}
                            />
                            {errors.rating && (
                                <p>{errors.rating}</p>
                            )}
                        </div>
                        {/* --------------------------------------PLATAFORMAS---------------------------------------- */}
                        <div>
                            <label >
                                <h5 > Selecciona las Plataformas</h5>
                                <select
                                    
                                    name='Platforms'
                                    onChange={(e) => handleChangePlatform(e)}
                                    defaultValue={'default'}
                                >
                                    {<option value="default" disabled>Platforms...</option>}
                                    {platforms.map((el, i) => {
                                        return (
                                            <option key={i} value={el}>
                                                {el}
                                            </option>
                                        )
                                    })}
                                </select>
                            </label>
                            {/* ----------------------------------------LISTA DE PLATAFORMAS----------------------------------- */}
                            <ul >
                                {values.platforms.length ? values.platforms.map((el, i) => (
                                    <div className='result' key={i}>
                                        <li>
                                            {el}
                                            <button onClick={(event) => { handleDeletePlatform(event, el) }}>x</button>
                                        </li>
                                    </div>
                                ))
                                    : errors.platforms && (
                                        <p>{errors.platforms}</p>
                                    )
                                }
                            </ul>
                        </div>
                        {/* -----------------------------------------GENEROS---------------------------------------- */}
                        <div>
                            <label>
                                <h5> Selecciona el Genero</h5>
                                <select onChange={(event) => handleChangeGenre(event)}
                                    
                                    name='Genres'
                                    defaultValue={'default'}
                                >
                                    <option value="default" disabled>Genero</option>
                                    {genres?.map((el, i) => {
                                        return (
                                            <option key={i} value={el}>
                                                {el}
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </label>
                            {/* ----------------------------------------LISTA DE GENEROS----------------------------------- */}
                            <ul>
                                {values.genres.length ? values.genres.map((el, i) => (
                                    <div key={i}>
                                        <li>
                                            {el}
                                            <button onClick={(event) => { handleDeleteGenre(event, el) }}>x</button>
                                        </li>
                                    </div>)
                                ) :
                                    errors.platforms && (
                                        <p>{errors.genres}</p>
                                    )
                                }
                            </ul>
                        </div>
                        <button type='submit'>Crear Video Juego!</button>
                </form>
            </div>
        </div>

    )
}

export default CreateGame