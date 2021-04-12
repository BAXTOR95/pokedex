import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import './Pokedex.css';
import PokedexList from '../../components/PokedexList/PokedexList';
import Pokemon from '../../components/Pokemon/Pokemon';

const Accordion = withStyles({
    root: {
        backgroundColor: 'rgb(81, 154, 251)',
        border: '1px solid rgba(26, 53, 88, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(26, 53, 88, .3)',
        borderBottom: '1px solid rgba(26, 53, 88 .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

export const Pokedex = props => {
    const pokemonData = useSelector(state => state.pokemon.pokemonData);
    const loadingPokemon = useSelector(state => state.pokemon.loading);
    const [ expanded, setExpanded ] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <React.Fragment>
            <Grid container spacing={ 2 }>
                <Grid item xs>
                    <PokedexList />
                </Grid>
                <Grid item xs>
                    <Accordion square expanded={ true } onChange={ handleChange('panel1') }>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Pokemon</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Route
                                path={ '/:pokemonId' }
                                component={ Pokemon } />
                            {!pokemonData && !loadingPokemon && <Typography>Select a Pokemon to see its details</Typography>}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={ expanded === 'panel2' } onChange={ handleChange('panel2') }>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Abilities</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Pokemon Abilities</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion square expanded={ expanded === 'panel3' } onChange={ handleChange('panel3') }>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Moves</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>Pokemon Moves</Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Pokedex;