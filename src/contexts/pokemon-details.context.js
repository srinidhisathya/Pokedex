import { createContext, useReducer } from "react";

export const PokemonDetailsContext = createContext();

const actionTypes = {
  SELECT_POKEMON: "SELECT_POKEMON",
  SET_DETAILS: "SET_DETAILS",
  SET_GENDER: "SET_GENDER",
  SET_WEAKNESS: "SET_WEAKNESS",
  SET_DESCRIPTION: "SET_DESCRIPTION",
  SET_GENDERS: "SET_GENDERS",
  UNSELECT_POKEMON: "UNSELECT_POKEMON",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

const initialState = {
  name: "",
  id: "",
  description: "",
  height: 0,
  weight: 0,
  genders: [],
  egg_groups: [],
  abilities: [],
  types: [],
  weak_against: [],
  image_url: "",
  stats: {
    hp: 0,
    defense: 0,
    "special-attack": 0,
    attack: 0,
    speed: 0,
    "special-defense": 0,
  },
  loading: true,
  error: "",
};

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SELECT_POKEMON:
      return {
        ...state,
        name: action.payload,
      };

    case actionTypes.SET_DETAILS:
      const { id, height, weight, types, abilities, sprites } = action.payload;
      const stats = {};
      for (const key of action.payload.stats) {
        stats[key.stat.name] = key.base_stat;
      }
      return {
        ...state,
        id,
        height,
        weight,
        image_url:
          sprites?.other?.dream_world?.front_default || sprites?.front_default,
        abilities: abilities.map((ability) => ability.ability.name),
        types: types.map((type) => type.type.name),
        stats,
      };
    case actionTypes.SET_WEAKNESS:
      return {
        ...state,
        weak_against: action.payload,
      };
    case actionTypes.SET_GENDERS:
      return {
        ...state,
        genders: action.payload,
      };
    case actionTypes.SET_DESCRIPTION:
      const { description, egg_groups } = action.payload;
      return {
        ...state,
        description: description,
        egg_groups: egg_groups,
      };
    case actionTypes.UNSELECT_POKEMON:
      return initialState;

    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export const PokemonDetailsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  const selectPokemon = (pokemon) => {
    try {
      dispatch({ type: actionTypes.SELECT_POKEMON, payload: pokemon });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  const setWeaknessData = async (types) => {
    try {
      let weaknessArr = [];
      await Promise.all(
        types.map((type) => {
          return fetch(`https://pokeapi.co/api/v2/type/${type}`)
            .then((res) => res.json())
            .then((res) => {
              let data = res?.damage_relations?.double_damage_from?.map(
                (item) => item.name
              );
              weaknessArr = [...weaknessArr, ...data];
            });
        })
      );
      weaknessArr = weaknessArr.filter(
        (weakness, index) => weaknessArr.indexOf(weakness) === index
      );
      dispatch({ type: actionTypes.SET_WEAKNESS, payload: weaknessArr });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  const setDescriptionData = async (pokemonId) => {
    try {
      let description = "";
      let egg_groups = [];
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
        .then((res) => res.json())
        .then((res) => {
          egg_groups = res.egg_groups.map((egg) => egg.name);
          description = res.flavor_text_entries
            .filter((item, index, arr) => {
              let filter =
                index < 10 &&
                arr.findIndex(
                  (item2) =>
                    item.flavor_text.substring(0, 15) ===
                    item2.flavor_text.substring(0, 15)
                );
              return (
                index === filter && item.language.name === "en" && index < 10
              );
            })
            .slice(0, 10)
            .map((item) => item.flavor_text.replaceAll(/[\n\f]/gm, " "))
            .join(" ");
        })
        .then(() =>
          dispatch({
            type: actionTypes.SET_DESCRIPTION,
            payload: { description, egg_groups },
          })
        );
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  const setGenderData = async (pokemon) => {
    try {
      let genderarr = [3, 2, 1];
      let result = ["female"];
      for (let i = 0; i < genderarr.length; i++) {
        let res = await fetch(
          `https://pokeapi.co/api/v2/gender/${genderarr[i]}`
        );
        res = await res.json();

        let tempArr = [];
        tempArr = res.pokemon_species_details.filter(
          (item) => item.pokemon_species.name === pokemon
        );
        if (tempArr.length > 0 && genderarr[i] === 3) {
          result = ["genderless"];
          break;
        } else if (tempArr.length > 0 && genderarr[i] === 2) {
          if (tempArr[0].rate > 0) {
            result = ["male", "female"];
            break;
          } else {
            result = ["male"];
          }
        } else {
          continue;
        }
      }
      dispatch({ type: actionTypes.SET_GENDERS, payload: result });
    } catch (error) {
      console.log(error.message);
    }
  };

  const setPokemonDetails = async (pokemon) => {
    try {
      dispatch({ type: actionTypes.SET_DETAILS, payload: pokemon });
      await setDescriptionData(pokemon.id);
      await setWeaknessData(pokemon.types.map((type) => type.type.name));
      await setGenderData(pokemon.name);
      await dispatch({ type: actionTypes.SET_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  const resetFunction = () => {
    try {
      dispatch({ type: actionTypes.UNSELECT_POKEMON });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  return (
    <PokemonDetailsContext.Provider
      value={{ state, selectPokemon, setPokemonDetails, resetFunction }}
    >
      {children}
    </PokemonDetailsContext.Provider>
  );
};
