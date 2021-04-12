import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    AppBar,
    Grid,
    TextField
} from "@material-ui/core";
import { Icon } from '@iconify/react';
import pokeballIcon from '@iconify-icons/mdi/pokeball';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import * as actions from '../../store/actions/index';
import { toFirstCharUppercase } from "../../shared/utility";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: "rgba(81, 154, 251, 1)"
    },
    appBar: {
        backgroundColor: 'rgba(26, 53, 88, .3)'
    },
    gridListTitleBar: {
        backgroundColor: 'rgba(26, 53, 88, .3)'
    },
    gridList: {
        width: "80%",
        height: "80vh",
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    iconCaptured: {
        color: 'rgba(255, 0, 47, 1)',
    },
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "25px",
        paddingRight: "25px",
        maxHeight: "85vh",
        overflow: "auto",
    },
    listSubheader: {
        backgroundColor: 'rgba(26, 53, 88, .3)'
    },
    searchContainer: {
        display: "flex",
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px"
    },
    searchInput: {
        width: "200px",
        margin: "5px"
    }
}));

export const PokedexList = (props) => {
    const classes = useStyles();
    const [ filter, setFilter ] = useState("");
    const history = useHistory();

    const dispatch = useDispatch();

    const pokemonListData = useSelector(state => state.pokedex.pokemonListData);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const loading = useSelector(state => state.pokedex.loading);
    const capturedPokemons = useSelector(state => state.pokedex.capturedPokemons);
    const totalCapturedPokemons = useSelector(state => state.pokedex.totalCapturedPokemons);

    const isAuthenticated = token !== null;

    const onAddCapturedPokemon = useCallback((pokemonId) => dispatch(actions.addCapturedPokemon(token, pokemonId, userId)), [ dispatch, token, userId ]);
    const onRemoveCapturedPokemon = useCallback((id) => dispatch(actions.removeCapturedPokemon(token, id)), [ dispatch, token ]);
    const onPokedexListLoad = useCallback(() => dispatch(actions.pokedexListLoad()), [ dispatch ]);
    const onFetchCapturedPokemons = useCallback(() => dispatch(actions.fetchCapturedPokemons(token, userId)), [ dispatch, token, userId ]);

    useEffect(() => {
        onPokedexListLoad();
        (isAuthenticated && onFetchCapturedPokemons());
    }, [ onPokedexListLoad, isAuthenticated, onFetchCapturedPokemons ]);

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    const handleCapturePokemon = (pokemonId) => {
        const captured = (capturedPokemons.find(id => id.pokemonId === pokemonId));
        if (captured) {
            onRemoveCapturedPokemon(captured.id);
        } else {
            onAddCapturedPokemon(pokemonId);
        }
    };

    const getPokemonCard = pokemonId => {
        const { id, name, sprite } = pokemonListData[ pokemonId ];

        return (
            <GridListTile onClick={ () => history.push(`/${ pokemonId }`) } key={ pokemonId }>
                <img src={ sprite } alt={ name } />
                <GridListTileBar
                    title={ toFirstCharUppercase(name) }
                    subtitle={ <span>#: { id }</span> }
                    className={ classes.gridListTitleBar }
                    actionIcon={
                        (
                            isAuthenticated &&
                            <IconButton aria-label={ `capture ${ name }` } className={ classes.icon } onClick={ () => handleCapturePokemon(pokemonId) }>
                                <Icon icon={ pokeballIcon } />
                            </IconButton>
                        )
                    }
                />
            </GridListTile>
        );
    };

    const getPokemonCardSkeleton = (quantity) => {
        const cards = [];
        for (let i = 1;i <= quantity;i++) {
            cards.push(
                <Grid item xs key={ i }>
                    <Skeleton variant="rect" width={ 150 } height={ 160 } />
                </Grid>
            );
        }

        return cards;
    }

    return (
        <div className={ classes.root }>
            <AppBar position="static" className={ classes.appBar }>
                <div className={ classes.searchContainer }>
                    <SearchIcon className={ classes.searchIcon } />
                    <TextField
                        onChange={ handleSearchChange }
                        className={ classes.searchInput }
                        label="Pokemon"
                        variant="standard"
                    />
                </div>
            </AppBar>
            <GridList cols={ 3 } className={ classes.gridList }>
                { pokemonListData && !loading ? (
                    Object.keys(pokemonListData).map(pokemonId =>
                        pokemonListData[ pokemonId ].name.includes(filter) &&
                        getPokemonCard(pokemonId))
                ) : (
                    getPokemonCardSkeleton(3)
                ) }
            </GridList>
        </div>
    );
}

export default PokedexList;