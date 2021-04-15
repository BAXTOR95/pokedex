import { put, delay, call } from 'redux-saga/effects';

import axios from '../../axios-db';
import * as actions from '../actions/index';
import { getSnackbarData } from '../../shared/utility';

export function* logoutSaga(action) {
    yield call([ localStorage, 'removeItem' ], 'token');
    yield call([ localStorage, 'removeItem' ], 'expirationDate');
    yield call([ localStorage, 'removeItem' ], 'userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        // returnSecureToken: true
    };
    // let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_API_KEY;
    // if (!action.isSignup) {
    //     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_API_KEY;
    // }

    let url = '/api/user/' + (action.isSignup ? 'create/' : 'token/');

    try {
        const response = yield axios.post(url, authData);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.non_field_errors[ 0 ], 'error')));
        yield put(actions.authFail(error.response.data.non_field_errors[ 0 ]));
    };
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate > new Date()) {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        } else {
            yield put(actions.logout());
        }
    }
}