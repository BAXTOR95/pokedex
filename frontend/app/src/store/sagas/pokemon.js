import { put } from 'redux-saga/effects';
import axios from '../../axios-poke-api';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';

export function* pokedexPokemonLoadSaga(action) {
    yield put(actions.pokedexPokemonLoadStart());
    try {
        const response = yield axios.get(`${ action.pokemonId }`);
        const { data } = response;
        yield put(actions.pokedexPokemonLoadSuccess(data));
    } catch (error) {
        yield put(actions.enqueueSnackbar(getSnackbarData("Could not fetch Pokemon Info", 'error')));
        yield put(actions.pokedexPokemonLoadFail(error));
    }
}