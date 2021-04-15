import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Card,
    CardMedia,
    CardContent,
    Avatar,
    IconButton,
    Chip,
    List,
    ListItem,
    Divider,
    Typography,
    Grid,
    Paper,
    ButtonBase,
    Collapse,
    CardActions
} from "@material-ui/core";
import MuiCardHeader from '@material-ui/core/CardHeader';
import MuiListItemText from '@material-ui/core/ListItemText';
import Skeleton from '@material-ui/lab/Skeleton';
import { Icon } from '@iconify/react';
import pokeballIcon from '@iconify-icons/mdi/pokeball';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as actions from '../../store/actions/index';
import pokemonNotFound from '../../assets/images/pokemon_not_found.png';
import { toFirstCharUppercase, handleCapturePokemon, round } from "../../shared/utility";

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
    list: {
        width: '100%',
        maxWidth: '36ch',
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
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


const Pokemon = (props) => {
    const { match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [ movesExpanded, setMovesExpanded ] = useState(false);

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
    };

    const handleExpandClick = () => {
        setMovesExpanded(!movesExpanded);
    };

    const getColorByMoveType = (type) => {
        switch (type) {
            case "normal": return "#A8A878";
            case "fighting": return "#C03028";
            case "flying": return "#A890F0";
            case "poison": return "#A040A0";
            case "ground": return "#E0C068";
            case "rock": return "#B8A038";
            case "bug": return "#A8B820";
            case "ghost": return "#705898";
            case "steel": return "#B8B8D0";
            case "fire": return "#F08030";
            case "water": return "#6890F0";
            case "grass": return "#78C850";
            case "electric": return "#F8D030";
            case "psychic": return "#F85888";
            case "ice": return "#98D8D8";
            case "dragon": return "#7038F8";
            case "dark": return "#705848";
            case "fairy": return "#EE99AC";
            case "unknown": return "#68A090";
            case "shadow": return "#604E82";
            default:
                return "#fff"
        }
    }

    const generatePokemonJSX = () => {
        const { name, id, species, height, weight, types, sprites, abilities, movesTypes } = pokemonData;
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
                                <ListItemText primary="Height" secondary={ `${ round(height * 0.1, 2) }m` } />
                            </ListItem>
                            <Divider component="li" />
                            <ListItem>
                                <ListItemText primary="Weight" secondary={ `${ round(weight * .1, 2) }kg` } />
                            </ListItem>
                        </List>
                    </div>
                    <div className={ classes.section2 }>
                        <Typography gutterBottom variant="body1">
                            Types:
                        </Typography>
                        <React.Fragment>
                            { types.map((typesInfo) => {
                                const { type } = typesInfo;
                                const { name } = type;
                                return (
                                    <Chip
                                        className={ classes.chip }
                                        label={ `${ name }` }
                                        key={ name }
                                        color='primary'
                                        style={ { backgroundColor: getColorByMoveType(name) } }
                                    />
                                );
                            }) }
                        </React.Fragment>
                    </div>
                    <div className={ classes.section2 }>
                        <Typography gutterBottom variant="body1">
                            Abilities:
                        </Typography>
                        <React.Fragment>
                            { abilities.map((abilitiesInfo) => {
                                const { ability } = abilitiesInfo;
                                const { name } = ability;
                                return (
                                    <Chip
                                        className={ classes.chip }
                                        label={ `${ name }` }
                                        key={ name }
                                    />
                                );
                            }) }
                        </React.Fragment>
                    </div>
                    <div className={ classes.section2 }>
                        <CardActions disableSpacing>
                            <Typography gutterBottom variant="body1">
                                Moves:
                            </Typography>
                            <StyledIconButton
                                className={ clsx(classes.expand, {
                                    [ classes.expandOpen ]: movesExpanded,
                                }) }
                                onClick={ handleExpandClick }
                                aria-expanded={ movesExpanded }
                                aria-label="show more"
                                color="secondary"
                            >
                                <ExpandMoreIcon />
                            </StyledIconButton>
                        </CardActions>
                        <Collapse in={ movesExpanded } timeout="auto" unmountOnExit>
                            { movesTypes.map((move) => {
                                const { name } = move;
                                const { type } = move;
                                return (
                                    <Chip
                                        className={ classes.chip }
                                        label={ `${ name }` }
                                        key={ name }
                                        color='primary'
                                        style={ { backgroundColor: getColorByMoveType(type) } }
                                    />
                                );
                            }) }
                        </Collapse>
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

export default Pokemon;