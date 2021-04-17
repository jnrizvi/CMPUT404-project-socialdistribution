import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => ({
    root: {
        // height: '300px',
        backgroundColor: 'white',
        marginBottom: '40px',
        borderRadius: "8px",
        padding: '1em 2em',
    },
    summary: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    author: {
        fontSize: '0.75em'
    }
}));  


export default function Comment(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <p className={classes.author}>Comment by: {props.data.author.displayName}</p>
            <p className={classes.summary}>{ props.data.comment }</p>
        </div>
    )
}
