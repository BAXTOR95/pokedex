import { put } from 'redux-saga/effects';
import axiosPoke from '../../axios-poke-api';
import axiosDb from '../../axios-db';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';

export function* pokedexLoadListSaga(action) {
    yield put(actions.pokedexListLoadStart());
    try {
        const response = yield axiosPoke.get('?limit=150');
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
            newPokemonData[ index + 1 ] = {
                id: index + 1,
                name: pokemon.name,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ index + 1 }.png`
            };
        });
        yield put(actions.pokedexListLoadSuccess(newPokemonData));
    } catch (error) {
        yield put(actions.enqueueSnackbar(getSnackbarData("Could not fetch Pokemon list", 'error')));
        yield put(actions.pokedexListLoadFail(error));
    }
};

export function* fetchCapturedPokemonsSaga(action) {
    // const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axiosDb.get('/api/pokedex/captured_pokemons/', {
            headers: {
                'Authorization': `Token ${ action.token }`
            }
        });
        yield put(actions.fetchCapturedPokemonsSuccess(response.data));
    } catch (error) {
        yield put(actions.enqueueSnackbar(getSnackbarData("Could not fetch captured pokemons", 'error')));
        yield put(actions.fetchCapturedPokemonsFailed(error));
    }
};

export function* addCapturedPokemonSaga(action) {
    try {
        const data = {
            pokemonId: action.pokemonId,
            userId: action.userId
        }
        const response = yield axiosDb.post('/api/pokedex/captured_pokemons/', data, {
            headers: {
                'Authorization': `Token ${ action.token }`
            }
        });
        yield put(actions.enqueueSnackbar(getSnackbarData(`Pokemon #${action.pokemonId} captured`, 'success')));
        yield put(actions.addCapturedPokemonSuccess(response.data));
    } catch (error) {
        yield put(actions.enqueueSnackbar(getSnackbarData(`Could not capture Pokemon #${action.pokemonId}`, 'error')));
        yield put(actions.addCapturedPokemonFailed(error));
    }
};

export function* removeCapturedPokemonSaga(action) {
    try {
        yield axiosDb.delete(`/api/pokedex/captured_pokemons/${ action.id }/`, {
            headers: {
                'Authorization': `Token ${ action.token }`
            }
        });
        yield put(actions.enqueueSnackbar(getSnackbarData(`Pokemon released`, 'success')));
        yield put(actions.removeCapturedPokemonSuccess(action.id));
    } catch (error) {
        yield put(actions.enqueueSnackbar(getSnackbarData(`Could not release Pokemon`, 'error')));
        yield put(actions.removeCapturedPokemonFailed(error));
    }
};
