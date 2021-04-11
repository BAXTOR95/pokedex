import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    AppBar,
    Toolbar,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    TextField
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { toFirstCharUppercase } from "../../shared/utility";
import axios from "../../axios-poke-api";


const useStyles = makeStyles(theme => ({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "25px",
        paddingRight: "25px",
        maxHeight: "85vh",
        overflow: "auto",
    },
    cardMedia: {
        margin: "auto"
    },
    cardContent: {
        textAlign: "center"
    },
    searchContainer: {
        display: "flex",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px"
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
    const loading = useSelector(state => state.pokedex.loading);

    const onPokedexListLoad = useCallback(() => dispatch(actions.pokedexListLoad()), [ dispatch ]);

    useEffect(() => {
        onPokedexListLoad();
    }, [ onPokedexListLoad ]);

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    const getPokemonCard = pokemonId => {
        const { id, name, sprite } = pokemonListData[ pokemonId ];

        return (
            <Grid item xs key={ pokemonId }>
                <Card
                    onClick={ () => history.push(`/${ pokemonId }`) }
                    style={ { width: "150px", height: "150px" } }>
                    <CardMedia
                        className={ classes.cardMedia }
                        image={ sprite }
                        style={ { width: "100px", height: "100px" } } />
                    <CardContent className={ classes.cardContent }>
                        <Typography>{ `${ id }. ${ toFirstCharUppercase(name) }` }</Typography>
                    </CardContent>
                </Card>
            </Grid>
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
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <div className={ classes.searchContainer }>
                        <SearchIcon className={ classes.searchIcon } />
                        <TextField
                            onChange={ handleSearchChange }
                            className={ classes.searchInput }
                            label="Pokemon"
                            variant="standard"
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Grid
                container
                spacing={ 1 }
                className={ classes.pokedexContainer }>
                { pokemonListData && !loading ? (
                    Object.keys(pokemonListData).map(pokemonId =>
                        pokemonListData[ pokemonId ].name.includes(filter) &&
                        getPokemonCard(pokemonId))
                ) : (
                    getPokemonCardSkeleton(3)
                ) }
            </Grid>
        </React.Fragment>
    );
}

export default withErrorHandler(PokedexList, axios);