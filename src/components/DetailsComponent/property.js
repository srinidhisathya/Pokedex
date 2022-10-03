import React from 'react';
import { TypeColor } from './typecolor.js';
import { TypeBackground } from './property-styled.jsx';

export const Property = (height, weight, genders, egggroups, abilities, weak, types) => {
    const inchToFeet = (value) => {
        var valueFeet = (value * 0.3937 * 10) / 12;
        var feet = Math.floor(valueFeet);
        var inch = Math.round((valueFeet - feet) * 12);
        return feet + "'" + inch + '"';
    };

    return (
        <div className="property-box" aria-label="property-section">
            <div className="line-one" aria-label="part-one">
                <div className="title" aria-label="height-section">
                    <span className="title-label">Height</span><br />
                    <span className="value-label">{inchToFeet(height)}</span>
                </div>
                <div className="title" aria-label="weight-section">
                    <span className="title-label">Weight</span><br />
                    <span className="value-label">{weight / 10} kg</span>
                </div>
                <div className="title" aria-label="gender-section">
                    <span className="title-label">Gender(s)</span><br />
                    <span className="value-label">{genders.join(",")}</span>
                </div>
                <div className="title" aria-label="egggroup-section">
                    <span className="title-label">Egg Groups</span><br />
                    <span className="value-label">{egggroups.join(",")}</span>
                </div>
            </div>
            <div className="line-two" aria-label="part-two">
                <div className="title" aria-label="ability-section">
                    <span className="title-label">Abilities</span><br />
                    <span className="value-label">{abilities.join(",")}</span>
                </div>
                <div className="title" aria-label="types-section">
                    <span className="title-label">Types</span><br />
                    <span className="value-label-bg">
                        {types.map((type, id) => (
                            <TypeBackground key={`${type}-${id}`} color={TypeColor(type)}>
                                {type}
                            </TypeBackground>
                        ))}
                    </span>
                </div>
                <div className="title" aria-label="weak-against-section">
                    <span className="title-label">Weak Against</span><br />
                    <span className="value-label-ng">
                        {weak.map((type, id) => (
                            <TypeBackground key={`${type}-${id}`} color={TypeColor(weak)}>
                                {type}
                            </TypeBackground>
                        ))}
                    </span>
                </div>
            </div>
        </div>
    )

};
