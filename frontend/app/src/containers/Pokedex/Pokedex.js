import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import './Pokedex.css';
import PokedexList from '../../components/PokedexList/PokedexList';
import Pokemon from '../../components/Pokemon/Pokemon';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 850,
    }
}));

export const Pokedex = props => {

    const pokemonData = useSelector(state => state.pokemon.pokemonData);

    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={ 1 }>
                <Grid item xs>
                    <PokedexList />
                </Grid>
                <Grid item xs>
                    <Route
                        path={ '/:pokemonId' }
                        component={ Pokemon } />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Pokedex;