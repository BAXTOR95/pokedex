import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import useHttpErrorHandler from '../../hooks/http-error-handler';


const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [ error, clearError ] = useHttpErrorHandler(axios);

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            clearError(false);
        };

        return (
            <React.Fragment>
                <Snackbar
                    anchorOrigin={ {
                        vertical: 'bottom',
                        horizontal: 'left',
                    } }
                    open={ error }
                    autoHideDuration={ 6000 }
                    onClose={ handleClose }
                    message={ error ? error.message : null }
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={ handleClose }>
                                UNDO
                            </Button>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={ handleClose }>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />
                {/* <Modal
                    show={ error }
                    modalClosed={ clearError }>
                    { error ? error.message : null }
                </Modal> */}
                <WrappedComponent { ...props } />
            </React.Fragment>
        );
    };
};

export default withErrorHandler;