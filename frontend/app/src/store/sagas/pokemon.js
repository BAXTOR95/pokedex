import { put, all } from 'redux-saga/effects';
import axiosPoke from '../../axios-poke-api';
import axios from 'axios';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';

export function* pokedexPokemonLoadSaga(action) {
    yield put(actions.pokedexPokemonLoadStart());
    try {
        const response = yield axiosPoke.get(`${ action.pokemonId }`);
        const { data } = response;
        const responseMoves = yield all(data.moves.map((movesInfo) => {
            const { move } = movesInfo;
            const { url } = move;
            const res = axios.get(url);
            return res;
        }));
        const newData = {
            ...data,
            statsLabel: data.stats.map((info) => info.stat.name),
            statsValue: data.stats.map((info) => info.base_stat),
            movesTypes: responseMoves.map((info) => {
                return {
                    name: info.data.name,
                    type: info.data.type.name
                }
            })
        }
        yield put(actions.pokedexPokemonLoadSuccess(newData));
    } catch (error) {
        yield put(actions.enqueueSnackbar(getSnackbarData("Could not fetch Pokemon Info", 'error')));
        yield put(actions.pokedexPokemonLoadFail(error));
    }
}