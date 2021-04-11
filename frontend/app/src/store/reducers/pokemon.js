import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    pokemonData: null,
    error: null,
    loading: false,
};

const pokedexPokemonLoadStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const pokedexPokemonLoadSuccess = (state, action) => {
    return updateObject(state, {
        pokemonData: action.pokemonData,
        error: null,
        loading: false
    });
};

const pokedexPokemonLoadFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POKEDEX_POKEMON_LOAD_START: return pokedexPokemonLoadStart(state, action);
        case actionTypes.POKEDEX_POKEMON_LOAD_SUCCESS: return pokedexPokemonLoadSuccess(state, action);
        case actionTypes.POKEDEX_POKEMON_LOAD_FAIL: return pokedexPokemonLoadFail(state, action);
        default: return state;
    }
}

export default reducer;