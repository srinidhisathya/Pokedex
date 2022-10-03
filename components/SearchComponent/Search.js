import React, { useEffect, useState, useContext } from 'react';
import { ReactComponent as IconSearch } from '../../utilities/icons/search.svg';
import { ReactComponent as IconClose } from '../../utilities/icons/close.svg';

export const SearchField = () => {
    const [openModal, setModalState] = useState(false);
    const handleMobileFilter =()=>{
        setModalState(true);
    }
   
    return (
        <div className="search-field-container" aria-label="search-input-area">
            <div className="search-one">
                <span className="search-field-label" aria-label="label-for-search-input">Search by</span>

                <form className="form-field-one">
                    <input type="search" id="search-tab" icon="search" className="search-field-input" placeholder="Name or Number" aria-label="search-input-field"></input>
                    <span className="search-icon" ><IconSearch/>
					
				</span>
                </form>
            </div>

            <div classsName="search-two">
                <span className="type-field-label" aria-label="label-for-type-dropdown">Type</span>
                <form className="form-field-two">
                <div className="dropdown">
                    <button className="drop-button"><span className="dropdown-one">Normal</span></button>
                    <div class="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                    </div>
                </div>
                </form>
               
            </div>
            <div classsName="search-three">
                <span className="type-field-label" aria-label="label-for-gender-dropdown">Gender</span>
                <form className="form-field-three">
                <div className="dropdown">
                    <button className="drop-button"><span className="dropdown-one">Normal</span></button>
                    <div class="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                    </div>
                </div>
                </form>
            </div>
            <div classsName="search-four">
                <span className="type-field-label" aria-label="label-for-stats-dropdown">Stats</span>
                <form className="form-field-four">
                <div className="dropdown">
                    <button className="drop-button"><span className="dropdown-one">Normal</span></button>
                    <div class="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                    </div>
                </div>
                </form>
            </div>

            <button className="mobile-filter" id="mobile-filter" onClick={handleMobileFilter}>Filter</button>

        </div>
    )
}
