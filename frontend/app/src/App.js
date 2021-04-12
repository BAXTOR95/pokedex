import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter,  } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Pokedex from './containers/Pokedex/Pokedex';
import Layout from './hoc/Layout/Layout';
import { withStyles } from '@material-ui/core/styles';

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});

const styles = {
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    }
};


const App = props => {
    const { onTryAutoSignup } = props;

    useEffect(() => {
        onTryAutoSignup();
    }, [ onTryAutoSignup ]);

    let routes = (
        <Switch>
            <Route path="/auth" render={ (props) => <Auth { ...props } /> } />
            <Route path="/" component={ Pokedex } />
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/logout" component={ Logout } />
                <Route path="/auth" render={ (props) => <Auth { ...props } /> } />
                <Route path="/" component={ Pokedex } />
            </Switch>
        );
    }

    return (
        <Layout>
            <Suspense fallback={ <p>Loading...</p> }>{ routes }</Suspense>
        </Layout>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
