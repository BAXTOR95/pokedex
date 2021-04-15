import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import createSagaMiddleware from 'redux-saga';
import { SnackbarProvider } from 'notistack';

// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from './store/reducers/auth';
import pokedexReducer from './store/reducers/pokedex';
import pokemonReducer from './store/reducers/pokemon';
import snackbarReducer from './store/reducers/snackbar';
import { watchAuth, watchPokedex, watchPokemon } from './store/sagas';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    pokedex: pokedexReducer,
    pokemon: pokemonReducer,
    snackbar: snackbarReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchPokedex);
sagaMiddleware.run(watchPokemon);

ReactDOM.render(
    <Provider store={ store }>
        <SnackbarProvider maxSnack={ 3 }>
            <BrowserRouter>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
