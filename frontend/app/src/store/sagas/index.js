import { takeEvery, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { pokedexLoadListSaga } from './pokedex';
import { pokedexPokemonLoadSaga } from './pokemon';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchPokedex() {
    yield takeEvery(actionTypes.POKEDEX_LIST_LOAD, pokedexLoadListSaga);
}

export function* watchPokemon() {
    yield takeLatest(actionTypes.POKEDEX_POKEMON_LOAD, pokedexPokemonLoadSaga);
}