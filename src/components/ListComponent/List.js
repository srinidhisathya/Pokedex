import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CardComponent } from '../CardComponent/Card';
import { PokemonListContext } from "../../contexts/pokemon-list.context";

const pageItems = 18;
let upperLimit = pageItems;
let lowerLimit = 0;

export const ListComponent = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [items, setItem] = useState([]);

    const getPokemons =  () => {
        axios.get('https://pokeapi.co/api/v2/pokemon')
        .then((data)=>{
            setItem(data.data.results)
        })
        .catch((err)=>{
            console.error(err)
            setIsLoading(false)
        })
    }

    const [PokeItems, setItemsList] = useState([]);

    useEffect(() => {
        isLoading && setItemsList([]);
    }, [isLoading]);



    useEffect(()=>{
        getPokemons()
    })

    return (
        <div className="card-container" aria-label="body-card">
            { 
        items && items.length>0 ? items.map((pokemon, id)=>{
            return <CardComponent key={pokemon.name} pokemon={pokemon} id={id+1} />
        }): (isLoading?<div>Waiting....</div>:<div>No Data Found!</div>)
        }
        </div>

        
    )
}
