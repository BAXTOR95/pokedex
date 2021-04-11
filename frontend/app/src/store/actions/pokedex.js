import * as actionTypes from './actionTypes';

export const pokedexListLoadStart = () => {
    return {
        type: actionTypes.POKEDEX_LIST_LOAD_START
    };
};

export const pokedexListLoadSuccess = (pokemonListData) => {
    return {
        type: actionTypes.POKEDEX_LIST_LOAD_SUCCESS,
        pokemonListData: pokemonListData
    };
};

export const pokedexListLoadFail = (error) => {
    return {
        type: actionTypes.POKEDEX_LIST_LOAD_FAIL,
        error: error
    };
};

export const pokedexListLoad = () => {
    return {
        type: actionTypes.POKEDEX_LIST_LOAD
    }
}