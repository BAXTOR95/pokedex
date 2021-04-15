import * as actionTypes from './actionTypes';
import { updateObject } from '../../shared/utility';

export const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: actionTypes.ENQUEUE_SNACKBAR,
        notification: updateObject(notification, {
            key: key || new Date().getTime() + Math.random()
        }),
    };
};

export const closeSnackbar = key => ({
    type: actionTypes.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key: key,
});

export const removeSnackbar = key => ({
    type: actionTypes.REMOVE_SNACKBAR,
    key: key,
});