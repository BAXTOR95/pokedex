import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    pokemonListData: null,
    capturedPokemons: [],
    totalCapturedPokemons: 0,
    error: null,
    loading: false,
};

const pokedexListLoadStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const pokedexListLoadSuccess = (state, action) => {
    return updateObject(state, {
        pokemonListData: action.pokemonListData,
        error: null,
        loading: false
    });
};

const pokedexListLoadFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const addCapturedPokemonSuccess = (state, action) => {
    const updatedCapturedPokemons = state.capturedPokemons.concat(action.pokemonCaptured);
    const updatedState = {
        capturedPokemons: updatedCapturedPokemons,
        totalCapturedPokemons: updatedCapturedPokemons.length
    };
    return updateObject(state, updatedState);
};

const addCapturedPokemonFailed = (state, action) => {
    return updateObject(state, { error: action.error });
};

const removeCapturedPokemonSuccess = (state, action) => {
    const updatedCapturedPokemons = [ ...state.capturedPokemons ].filter(pokemon => {
        return pokemon.id !== action.id;
    });
    const updatedState = {
        capturedPokemons: updatedCapturedPokemons,
        totalCapturedPokemons: updatedCapturedPokemons.length
    };
    return updateObject(state, updatedState);
};

const removeCapturedPokemonFailed = (state, action) => {
    return updateObject(state, { error: action.error });
};

const fetchCapturedPokemonsSuccess = (state, action) => {
    return updateObject(state, {
        capturedPokemons: action.capturedPokemons,
        totalCapturedPokemons: action.capturedPokemons.length
    });
};

const fetchCapturedPokemonsFailed = (state, action) => {
    return updateObject(state, { error: action.error });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POKEDEX_LIST_LOAD_START: return pokedexListLoadStart(state, action);
        case actionTypes.POKEDEX_LIST_LOAD_SUCCESS: return pokedexListLoadSuccess(state, action);
        case actionTypes.POKEDEX_LIST_LOAD_FAIL: return pokedexListLoadFail(state, action);
        case actionTypes.ADD_CAPTURED_POKEMON_SUCCESS: return addCapturedPokemonSuccess(state, action);
        case actionTypes.ADD_CAPTURED_POKEMON_FAILED: return addCapturedPokemonFailed(state, action);
        case actionTypes.REMOVE_CAPTURED_POKEMON_SUCCESS: return removeCapturedPokemonSuccess(state, action);
        case actionTypes.REMOVE_CAPTURED_POKEMON_FAILED: return removeCapturedPokemonFailed(state, action);
        case actionTypes.FETCH_CAPTURED_POKEMONS_SUCCESS: return fetchCapturedPokemonsSuccess(state, action);
        case actionTypes.FETCH_CAPTURED_POKEMONS_FAILED: return fetchCapturedPokemonsFailed(state, action);
        default: return state;
    }
};

export default reducer;