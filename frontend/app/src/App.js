import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Pokedex from './containers/Pokedex/Pokedex';

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});


const App = props => {
    const { onTryAutoSignup } = props;

    useEffect(() => {
        onTryAutoSignup();
    }, [ onTryAutoSignup ]);

    let routes = (
        <Switch>
            <Route path="/auth" render={ (props) => <Auth { ...props } /> } />
            <Route path="/" exact component={ Pokedex } />
            <Redirect to="/" />
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/logout" component={ Logout } />
                <Route path="/auth" render={ (props) => <Auth { ...props } /> } />
                <Route path="/" exact component={ Pokedex } />
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <div>
            <Suspense fallback={ <p>Loading...</p> }>{ routes }</Suspense>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
