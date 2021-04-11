import * as actionTypes from './actionTypes';

export const pokedexPokemonLoadStart = () => {
    return {
        type: actionTypes.POKEDEX_POKEMON_LOAD_START
    }
}

export const pokedexPokemonLoadSuccess = (pokemonData) => {
    return {
        type: actionTypes.POKEDEX_POKEMON_LOAD_SUCCESS,
        pokemonData: pokemonData
    }
}

export const pokedexPokemonLoadFail = (error) => {
    return {
        type: actionTypes.POKEDEX_POKEMON_LOAD_FAIL,
        error: error
    }
}

export const pokedexPokemonLoad = (pokemonId) => {
    return {
        type: actionTypes.POKEDEX_POKEMON_LOAD,
        pokemonId: pokemonId
    }
}