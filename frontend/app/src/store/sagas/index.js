import { takeEvery, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { pokedexLoadListSaga, addCapturedPokemon, removeCapturedPokemon, fetchCapturedPokemons } from './pokedex';
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
    yield takeEvery(actionTypes.FETCH_CAPTURED_POKEMONS, fetchCapturedPokemons);
    yield takeLatest(actionTypes.ADD_CAPTURED_POKEMON, addCapturedPokemon);
    yield takeLatest(actionTypes.REMOVE_CAPTURED_POKEMON, removeCapturedPokemon);
}

export function* watchPokemon() {
    yield takeLatest(actionTypes.POKEDEX_POKEMON_LOAD, pokedexPokemonLoadSaga);
}