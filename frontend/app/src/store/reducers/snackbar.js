import * as actionTypes from '../actions/actionTypes';
// import { updateObject } from '../../shared/utility';

const initialState = {
    notifications: [],
};

const enqueueSnackbar = (state, action) => {
    return {
        ...state,
        notifications: [
            ...state.notifications,
            {
                key: action.key,
                ...action.notification,
            },
        ],
    };
};

const closeSnackbar = (state, action) => {
    return {
        ...state,
        notifications: state.notifications.map(notification => (
            (action.dismissAll || notification.key === action.key)
                ? { ...notification, dismissed: true }
                : { ...notification }
        )),
    };
};

const removeSnackbar = (state, action) => {
    return {
        ...state,
        notifications: state.notifications.filter(
            notification => notification.key !== action.key,
        ),
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ENQUEUE_SNACKBAR: return enqueueSnackbar(state, action);
        case actionTypes.CLOSE_SNACKBAR: return closeSnackbar(state, action);
        case actionTypes.REMOVE_SNACKBAR: return removeSnackbar(state, action);
        default: return state;
    }
}

export default reducer;
