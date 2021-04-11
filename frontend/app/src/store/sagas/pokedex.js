import { put } from 'redux-saga/effects';
import axios from '../../axios-poke-api';

import * as actions from '../actions/index';


export function* pokedexLoadListSaga(action) {
    yield put(actions.pokedexListLoadStart());
    try {
        const response = yield axios.get('?limit=887');
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
        yield put(actions.pokedexListLoadFail(error));
    }
}