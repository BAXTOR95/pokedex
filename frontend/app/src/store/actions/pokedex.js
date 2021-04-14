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


export const addCapturedPokemon = (token, pokemonId, userId) => {
    return {
        type: actionTypes.ADD_CAPTURED_POKEMON,
        token: token,
        pokemonId: pokemonId,
        userId: userId
    }
}

export const addCapturedPokemonSuccess = (pokemonCaptured) => {
    return {
        type: actionTypes.ADD_CAPTURED_POKEMON_SUCCESS,
        pokemonCaptured: pokemonCaptured
    }
}

export const addCapturedPokemonFailed = (error) => {
    return {
        type: actionTypes.ADD_CAPTURED_POKEMON_FAILED,
        error: error
    }
}

export const removeCapturedPokemon = (token, id) => {
    return {
        type: actionTypes.REMOVE_CAPTURED_POKEMON,
        token: token,
        id: id
    }
}

export const removeCapturedPokemonSuccess = (id) => {
    return {
        type: actionTypes.REMOVE_CAPTURED_POKEMON_SUCCESS,
        id: id,
    }
}

export const removeCapturedPokemonFailed = (error) => {
    return {
        type: actionTypes.REMOVE_CAPTURED_POKEMON_FAILED,
        error: error
    }
}

export const fetchCapturedPokemons = (token, userId) => {
    return {
        type: actionTypes.FETCH_CAPTURED_POKEMONS,
        token: token,
        userId: userId
    }
}

export const fetchCapturedPokemonsSuccess = (capturedPokemons) => {
    return {
        type: actionTypes.FETCH_CAPTURED_POKEMONS_SUCCESS,
        capturedPokemons: capturedPokemons
    }
};

export const fetchCapturedPokemonsFailed = (error) => {
    return {
        type: actionTypes.FETCH_CAPTURED_POKEMONS_FAILED,
        error: error
    };
};