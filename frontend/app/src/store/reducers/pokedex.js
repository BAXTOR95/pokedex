import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    pokemonListData: null,
    pokemonData: null,
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POKEDEX_LIST_LOAD_START: return pokedexListLoadStart(state, action);
        case actionTypes.POKEDEX_LIST_LOAD_SUCCESS: return pokedexListLoadSuccess(state, action);
        case actionTypes.POKEDEX_LIST_LOAD_FAIL: return pokedexListLoadFail(state, action);
        default: return state;
    }
}

export default reducer;