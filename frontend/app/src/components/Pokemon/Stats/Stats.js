import React from 'react';
import { useSelector } from 'react-redux';
import { Radar, defaults } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        margin: "auto",
        height: "100%",
        width: "100%",
        backgroundColor: 'rgba(26, 53, 88, .3)',
    }
}));

const Stats = () => {

    const pokemonData = useSelector(state => state.pokemon.pokemonData);
    const classes = useStyles();

    defaults.global.defaultFontSize = 10;
    defaults.global.defaultFontColor = 'white';

    let charData = {
        labels: pokemonData.statsLabel,
        datasets: [
            {
                label: `${ pokemonData.name } stats`,
                data: pokemonData.statsValue,
                fill: true,
                backgroundColor: 'rgba(193, 32, 38, 0.9)',
                borderColor: 'rgba(26, 53, 88, .3)',
                pointBackgroundColor: 'rgb(193, 32, 38)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(193, 32, 38)'
            }
        ]
    }

    return (
        <div className={ classes.root }>
            <Radar data={ charData } options={ {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontSize: 16,

                    }
                },
                tooltips: {
                    backgroundColor: 'rgba(26, 53, 88, .3)',
                    titleFontSize: 15,
                    bodyFontSize: 15,
                    footerFontSize: 15
                },
                scale: {
                    angleLines: {
                        display: false
                    },
                    ticks: {
                        suggestedMin: 50,
                        suggestedMax: 100,
                        fontSize: 15,
                    }
                }
            } } />
        </div>
    )
}

export default Stats;
