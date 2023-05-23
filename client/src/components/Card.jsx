import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/Card.module.css'

export default function Card({id, name, image, genres}) {
    return (
        <div className={styles.card}> 
            <Link to={`/detail/${id}`}>
                <h3>{name?.length > 24 ? name.slice(0, 23) : name}</h3>
                <img src={image} alt='No se encontró imagen' width="200px" height="200px" />
                <h6>{genres}</h6>
            </Link>
        </div>
    );
}