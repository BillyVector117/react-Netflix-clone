import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(4),
        },
    },
}));

export default function Message({ severity, messageText }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Alert severity={severity}>
                <strong>{messageText}</strong>
            </Alert>
        </div>
    );
}