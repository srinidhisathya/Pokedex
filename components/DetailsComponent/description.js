import React from 'react';
import { ReactComponent as IconClose } from '../../utilities/icons/close.svg';

export const Description = (pokemonName, image, desc, closePokemonModal, id) => {
    const [readMoretoggle, settoggleState] = useState(false);

    const toggleState = () => {
        settoggleState(!readMoretoggle);
    };

    return (
        <div className="pokemon-desc-top" aria-label="pokemon-item">
            <div className="pokemon-header-desc">
                <div className="desc-item-image" aria-label="pokemon-image">
                    <img src={image} alt={pokemonName} aria-hidden="true" className="image-desc" />
                </div>
                <div className="header-right">
                    <div className="item-title" aria-label={`${pokemonName} ith id ${id}`}>
                        {pokemonName} | {id}
                    </div>
                    <div className="close-btn" onClick={closePokemonModal}><IconClose /></div>
                </div>
            </div>
            <div className="poke-desc" aria-label="description-paragraph">
                <p>{desc}</p>...{""}<button onClick={toggleState}>read more
                </button>
            </div>
            {readMoretoggle && (
                <div className="read-more-modal" aria-label="read-more-details">
                    <span className="read-more">{desc}</span>
                    <button onClick={toggleState} className="close-icon" aria-label={"close read more"}><IconClose/>
                        {toggleState}
                    </button>
                </div>
            )}
        </div>
    )
}