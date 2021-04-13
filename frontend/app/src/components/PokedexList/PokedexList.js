import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    AppBar,
    Grid,
    Typography,
    TextField,
    Badge,
    Container
} from "@material-ui/core";
import { Icon } from '@iconify/react';
import pokeballIcon from '@iconify-icons/mdi/pokeball';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import * as actions from '../../store/actions/index';
import { toFirstCharUppercase, handleCapturePokemon } from "../../shared/utility";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: "rgba(81, 154, 251, 1)",
    },
    searchContainerBar: {
        backgroundColor: 'rgba(26, 53, 88, .3)',
        height: "56px",
    },
    ownedContainerBar: {
        backgroundColor: 'rgba(26, 53, 88, .3)',
        color: theme.palette.common.white,
        height: "56px",
        textAlign: "right",
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    gridListTitleBar: {
        backgroundColor: 'rgba(26, 53, 88, .3)'
    },
    gridList: {
        width: "95%",
        height: "80vh",
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
        marginLeft: "5%",
        width: "100%"
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    }
}));

const StyledTextField = withStyles((theme) => ({
    root: {
        width: "200px",
        margin: "5px",
        "& .MuiInputBase-root": {
            color: theme.palette.common.white,
        }
    }
}))(TextField);

const StyledIconButton = withStyles((theme) => ({
    colorPrimary: {
        color: 'rgba(255, 0, 47, 1)',
    },
    colorSecondary: {
        color: 'rgba(255, 255, 255, 0.54)',
    }
}))(IconButton);

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
                            <StyledIconButton
                                aria-label={ `capture ${ name }` }
                                color={ capturedPokemons.find((key) =>
                                    key.pokemonId === pokemonId.toString()
                                ) ? "primary" : "secondary" }
                                onClick={ () => handleCapturePokemon(
                                    pokemonId,
                                    capturedPokemons,
                                    onRemoveCapturedPokemon,
                                    onAddCapturedPokemon
                                ) }>
                                <Icon icon={ pokeballIcon } />
                            </StyledIconButton>
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
            <AppBar position="static" className={ classes.searchContainerBar }>
                <Grid container spacing={ 1 } alignItems="flex-end" className={ classes.searchContainer }>
                    <Grid item>
                        <SearchIcon className={ classes.searchIcon } />
                    </Grid>
                    <Grid item>
                        <StyledTextField
                            onChange={ handleSearchChange }
                            className={ classes.searchInput }
                            label="Pokemon"
                            variant="standard"
                        />
                    </Grid>
                </Grid>
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
            <Container position="static" className={ classes.ownedContainerBar }>
                {
                    isAuthenticated &&
                    <Badge color="secondary" badgeContent={ totalCapturedPokemons } showZero>
                        <Typography>Pokemons Owned <Icon icon={ pokeballIcon } /></Typography>
                    </Badge>
                }
            </Container>
        </div>
    );
}

export default PokedexList;