import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link, Grid, Paper, ButtonBase } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { toFirstCharUppercase } from '../../shared/utility';
import axios from '../../axios-poke-api';
import pokemonNotFound from '../../assets/images/pokemon_not_found.png';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 850,
    },
    image: {
        width: 180,
        height: 180,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));


export const Pokemon = (props) => {
    const { match } = props;
    const { params } = match;
    const { pokemonId } = params;

    const dispatch = useDispatch();

    const pokemonData = useSelector(state => state.pokemon.pokemonData);
    const loading = useSelector(state => state.pokemon.loading);
    const error = useSelector(state => state.pokemon.error);

    const onPokedexPokemonLoad = useCallback(() => dispatch(actions.pokedexPokemonLoad(pokemonId)), [ dispatch, pokemonId ]);

    const classes = useStyles();

    useEffect(() => {
        onPokedexPokemonLoad();
    }, [ onPokedexPokemonLoad ]);

    const generatePokemonError = (error) => {
        return (
            <Paper className={ classes.paper }>
                <Grid container>
                    <Grid item>
                        <ButtonBase>
                            <img style={ { width: "100%" } } src={ pokemonNotFound } alt="pokemon_not_found" />
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    const generatePokemonSkeleton = () => {
        return (
            <div className={ classes.root }>
                <Paper className={ classes.paper }>
                    <Grid container spacing={ 2 }>
                        <Grid item>
                            <ButtonBase className={ classes.image }>
                                <Skeleton variant="rect" width={ 180 } height={ 180 } />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={ 12 } sm container>
                            <Grid item xs container direction="column" spacing={ 2 }>
                                <Grid item xs>
                                    <Skeleton animation="wave" variant="text" />
                                    <Skeleton animation="wave" variant="text" />
                                    <Skeleton animation="wave" variant="text" />
                                    <Skeleton animation="wave" variant="text" />
                                    <Skeleton animation="wave" variant="text" />
                                    <Skeleton animation="wave" variant="text" />
                                    <Skeleton animation="wave" variant="text" />
                                    <Skeleton animation="wave" variant="text" />
                                    <Skeleton animation="wave" variant="text" />
                                    <Skeleton animation="wave" variant="text" />
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Skeleton animation="wave" variant="circle" width={ 40 } height={ 40 } />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }

    const generatePokemonJSX = () => {
        const { name, id, species, height, weight, types, sprites } = pokemonData;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${ id }.png`;
        const { front_default } = sprites;

        return (
            <div className={ classes.root }>
                <Paper className={ classes.paper }>
                    <Grid container spacing={ 2 }>
                        <Grid item>
                            <ButtonBase className={ classes.image }>
                                <img className={ classes.img } src={ fullImageUrl } alt="full_pokemon_image" />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={ 12 } sm container>
                            <Grid item xs container direction="column" spacing={ 2 }>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h3">
                                        { `${ id }.` } { toFirstCharUppercase(name) }
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        Pokemon Info
                                        </Typography>
                                    <Typography component={ 'div' } variant="body2">
                                        Species:
                                            <Typography>
                                            <Link href={ species.url }>{ species.name }</Link>
                                        </Typography>
                                    </Typography>
                                    <Typography component={ 'div' } variant="body2">
                                        Height:
                                            <Typography color="textSecondary">
                                            { `${ height * 10 } cm` }
                                        </Typography>
                                    </Typography>
                                    <Typography component={ 'div' } variant="body2">
                                        Weight:
                                            <Typography color="textSecondary">
                                            { `${ weight * .1 } kg` }
                                        </Typography>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" gutterBottom>
                                        Types:
                                        </Typography>
                                    { types.map((typesInfo) => {
                                        const { type } = typesInfo;
                                        const { name } = type;
                                        return (
                                            <Typography key={ name } color="textSecondary">
                                                { `${ name }` }
                                            </Typography>
                                        );
                                    }) }
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    <img alt="pokemon_sprite" src={ front_default } />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }

    return (
        <React.Fragment>
            {loading && generatePokemonSkeleton() }
            {!loading && pokemonData && generatePokemonJSX() }
            {!loading && error && generatePokemonError(error) }
        </React.Fragment>
    );
}

export default withErrorHandler(Pokemon, axios);