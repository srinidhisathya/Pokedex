import React, { useContext } from 'react';
import {
    getPokemonId,
    Scroll,
} from "../../utilities/utilities";
import { PokemonDetailsContext } from "../../contexts/pokemon-details.context.js";
import { Description } from './description';
import { Property } from './property';

export const DetailsComponent = () => {
    const { state, resetFunction } = useContext(PokemonDetailsContext);
    const { pokemonName, image, id, types, desc, height, genders, weight, egggroups, abilities, weak, stats } = state;

    const closePokemonModal = () => {
        resetFunction();
        Scroll("auto");
    };

    return (
        <div className="details" aria-label="deatils-pokemon">
            <Description pokemonName={pokemonName} image={image} desc={desc} closePokemonModal={closePokemonModal} id={id} />
            <Property height={height} weight={weight} genders={genders} egggroups={egggroups} abilities={abilities} weak={weak} types={types}></Property>
        </div>
    )
};