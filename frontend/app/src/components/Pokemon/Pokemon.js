import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import MuiCardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Typography, Grid, Paper, ButtonBase } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Icon } from '@iconify/react';
import pokeballIcon from '@iconify-icons/mdi/pokeball';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-poke-api';
import pokemonNotFound from '../../assets/images/pokemon_not_found.png';
import { toFirstCharUppercase, handleCapturePokemon } from "../../shared/utility";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        maxWidth: 850,
        backgroundColor: 'rgba(26, 53, 88, .3)',
        color: theme.palette.common.white,
    },
    mediaRoot: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    media: {
        height: "8em",
        width: "80%",
        paddingBottom: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 850,
        backgroundColor: 'rgba(26, 53, 88, .3)'
    },
    image: {
        width: 180,
        height: 180,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
    list: {
        width: '100%',
        maxWidth: '36ch',
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    }
}));

const CardHeader = withStyles((theme) => ({
    title: {
        fontSize: "2em"
    },
    subheader: {
        color: theme.palette.common.white
    }
}))(MuiCardHeader);

const ListItemText = withStyles((theme) => ({
    secondary: {
        color: theme.palette.grey[ 300 ]
    }
}))(MuiListItemText);

const StyledIconButton = withStyles((theme) => ({
    colorPrimary: {
        color: 'rgba(255, 0, 47, 1)',
    },
    colorSecondary: {
        color: 'rgba(255, 255, 255, 0.54)',
    }
}))(IconButton);


export const Pokemon = (props) => {
    const { match } = props;
    const { params } = match;
    const { pokemonId } = params;

    const dispatch = useDispatch();

    const pokemonData = useSelector(state => state.pokemon.pokemonData);
    const loading = useSelector(state => state.pokemon.loading);
    const error = useSelector(state => state.pokemon.error);
    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const capturedPokemons = useSelector(state => state.pokedex.capturedPokemons);

    const isAuthenticated = token !== null;

    const onPokedexPokemonLoad = useCallback(() => dispatch(actions.pokedexPokemonLoad(pokemonId)), [ dispatch, pokemonId ]);
    const onAddCapturedPokemon = useCallback((pokemonId) => dispatch(actions.addCapturedPokemon(token, pokemonId, userId)), [ dispatch, token, userId ]);
    const onRemoveCapturedPokemon = useCallback((id) => dispatch(actions.removeCapturedPokemon(token, id)), [ dispatch, token ]);

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
        const { name, id, species, height, weight, types, sprites, abilities } = pokemonData;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${ id }.png`;
        const { front_default } = sprites;

        return (
            <Card className={ classes.root }>
                <CardHeader
                    avatar={
                        <Avatar alt="pokemon_sprite" src={ front_default } className={ classes.avatar } />
                    }
                    action={
                        (
                            isAuthenticated &&
                            <StyledIconButton
                                aria-label={ `capture ${ name }` }
                                color={ capturedPokemons.find((key) =>
                                    key.pokemonId === id.toString()
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
                    title={ toFirstCharUppercase(name) }
                    subheader={ `#: ${ id }` }
                />
                <div className={ classes.mediaRoot }>
                    <CardMedia
                        className={ classes.media }
                        image={ fullImageUrl }
                        title={ name }
                    />
                </div>
                <CardContent>
                    <div className={ classes.section1 }>
                        <Typography gutterBottom variant="body1">
                            Pokemon Info:
                        </Typography>
                        <List className={ classes.list }>
                            <ListItem>
                                <ListItemText primary="Species" secondary={ species.name } />
                            </ListItem>
                            <Divider component="li" />
                            <ListItem>
                                <ListItemText primary="Height" secondary={ `${ Math.round(height * 0.1) }m` } />
                            </ListItem>
                            <Divider component="li" />
                            <ListItem>
                                <ListItemText primary="Weight" secondary={ `${ Math.round(weight * .1) }kg` } />
                            </ListItem>
                        </List>
                    </div>
                    <div className={ classes.section2 }>
                        <Typography gutterBottom variant="body1">
                            Types:
                            </Typography>
                        <div>
                            { types.map((typesInfo) => {
                                const { type } = typesInfo;
                                const { name } = type;
                                return (
                                    <Chip className={ classes.chip } label={ `${ name }` } key={ name } />
                                );
                            }) }
                        </div>
                    </div>
                    <div className={ classes.section2 }>
                        <Typography gutterBottom variant="body1">
                            Abilities:
                            </Typography>
                        <div>
                            { abilities.map((abilitiesInfo) => {
                                const { ability } = abilitiesInfo;
                                const { name } = ability;
                                return (
                                    <Chip className={ classes.chip } label={ `${ name }` } key={ name } />
                                );
                            }) }
                        </div>
                    </div>
                </CardContent>
            </Card>
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