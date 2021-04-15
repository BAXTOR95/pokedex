import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import * as actions from '../../store/actions/index';

const Notifier = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(store => store.snackbar.notifications);
    const onRemoveSnackbar = useCallback((key) => dispatch(actions.removeSnackbar(key)), [ dispatch ]);
    const [ displayed, setDisplayed ] = useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const storeDisplayed = useCallback((id) => {
        setDisplayed(displayed.concat(id));
    }, [ displayed ]);

    const removeDisplayed = useCallback((id) => {
        setDisplayed(displayed.filter(key => id !== key));
    }, [ displayed ]);

    React.useEffect(() => {
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(key);
                return;
            }

            // do nothing if snackbar is already displayed
            if (displayed.includes(key)) return;

            // display snackbar using notistack
            enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, myKey) => {
                    if (options.onClose) {
                        options.onClose(event, reason, myKey);
                    }
                },
                onExited: (event, myKey) => {
                    // remove this snackbar from redux store
                    onRemoveSnackbar(myKey);
                    removeDisplayed(myKey);
                },
            });

            // keep track of snackbars that we've displayed
            storeDisplayed(key);
        });
    }, [
        notifications,
        closeSnackbar,
        enqueueSnackbar,
        dispatch,
        displayed,
        onRemoveSnackbar,
        removeDisplayed,
        storeDisplayed
    ]);

    return null;
};

export default Notifier;
