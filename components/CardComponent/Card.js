import React, { useState, useEffect, useContext } from 'react';
import {
    getPokemonId,
    Scroll,
} from "../../utilities/utilities";
import { PokemonDetailsContext } from "../../contexts/pokemon-details.context.js";

export const CardComponent = ({ pokemon, id }) => {
    const {name} = pokemon;
    const [image, setImage] = useState('');
    const [info, setInfo] = useState(null);

    const getPokemonDetail = () => {
        setImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`)
        
    }

    useEffect(()=>{
       getPokemonDetail(id)
    }, [id]);

    return (
        <div className="item-card" aria-label="card-item">
            <div className="card-item-image" aria-label="pokemon-image">
                <img src={image
          } className="item-image-size" alt="pokemon-image" />
            </div>
            <div className="card-info" aria-label="pokemon-info">
                <p className="pokemon-name">{name[0].toUpperCase()+name.slice(1)}</p>
                <span className="pokemon-id">id</span>
            </div>
        </div>
    )
}