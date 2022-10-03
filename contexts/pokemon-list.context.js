import { createContext, useEffect, useState } from "react";

export const PokemonListContext = createContext();

let allPokemons = [];

export const PokemonListProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchResults, setSearchResult] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [filteredTypesPokemons, setFilteredTypesPokemons] = useState([]);
  const [filteredGenderPokemons, setFilteredGendersPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  let tempFG = [];
  let tempFT = [];

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1200")
      .then((res) => res.json())
      .then((res) => {
        allPokemons = res.results.map((item) => {
          return item.name;
        });
        setLoading(false);
      });
    //eslint-disable-next-line
  }, []);

  const filterPokemonsUsingSearch = (searchText) => {
    if (searchText.length > 0) {
      setSearchResult(
        allPokemons.filter(
          (pokemon, index) =>
            pokemon.startsWith(searchText.toLowerCase()) ||
            index + 1 === Number(searchText)
        )
      );
    } else {
      setSearchResult([]);
      setSelectedPokemon([]);
    }
    setLoading(false);
  };

  const filterBoth = (arr1, arr2) => {
    let arr = arr2.filter((item) => arr1.indexOf(item) !== -1);
    setFilteredPokemons(arr);
  };

  const selectSearchResult = (selectedPokemon) => {
    setSelectedPokemon([selectedPokemon]);
    setSearchResult([]);
    setLoading(false);
  };

  const getGendersFilterPokemons = async (genderArr) => {
    if (genderArr.length === 0) {
      setFilteredGendersPokemons([]);
      setFilteredPokemons(filteredTypesPokemons);
    } else {
      let pokemonsArr = [];
      for (let i = 0; i < genderArr.length; i++) {
        let res = await fetch(
          `https://pokeapi.co/api/v2/gender/${genderArr[i]}`
        );
        res = await res.json();
        pokemonsArr = [...res.pokemon_species_details, ...pokemonsArr];
      }
      pokemonsArr = pokemonsArr.map((item) => item.pokemon_species.name);
      pokemonsArr = [...new Set(pokemonsArr)];
      setFilteredGendersPokemons(pokemonsArr);
      tempFG = pokemonsArr;

      if (tempFT.length > 0 && pokemonsArr.length > 0) {
        filterBoth(pokemonsArr, tempFT);
        setLoading(false);
      } else {
        setFilteredPokemons(pokemonsArr);
        setLoading(false);
      }
    }
  };

  const getTypesFilterPokemons = async (typeArr) => {
    if (typeArr.length === 0) {
      setFilteredTypesPokemons([]);
      setFilteredPokemons(filteredGenderPokemons);
    } else {
      let pokemonsArr = [];
      for (let i = 0; i < typeArr.length; i++) {
        let res = await fetch(`https://pokeapi.co/api/v2/type/${typeArr[i]}`);
        res = await res.json();
        pokemonsArr = [...res.pokemon, ...pokemonsArr];
      }

      pokemonsArr = pokemonsArr.map((item) => item.pokemon.name);
      pokemonsArr = [...new Set(pokemonsArr)];

      setFilteredTypesPokemons(pokemonsArr);
      tempFT = pokemonsArr;

      if (tempFG.length > 0 && pokemonsArr.length > 0) {
        filterBoth(pokemonsArr, tempFG);
        setLoading(false);
      } else {
        setFilteredPokemons(pokemonsArr);
        setLoading(false);
      }
    }
  };

  const resetFilters = () => {
    setFilteredGendersPokemons([]);
    setFilteredTypesPokemons([]);
    setFilteredPokemons([]);
    setSelectedPokemon([]);
  };

  return (
    <PokemonListContext.Provider
      value={{
        allPokemons,
        searchResults,
        filterPokemonsUsingSearch,
        setLoading,
        loading,
        selectSearchResult,
        selectedPokemon,
        filteredPokemons,
        getGendersFilterPokemons,
        getTypesFilterPokemons,
        initialLoad,
        setInitialLoad,
        resetFilters,
      }}
    >
      {children}
    </PokemonListContext.Provider>
  );
};
