import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    pageNumber: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: '6px'
    },
    button: {
        '&:focus': {
            outline: '0',
        }
    }
}));

export default function Pagination(props) {
    const classes = useStyles();

    const rightClick = () => {
        props.onClickHandler('right');
    }

    const leftClick = () => {
        props.onClickHandler('left');
    }


    return (
        <div className={classes.root}>
            <IconButton aria-label="delete" className={classes.button} onClick={leftClick}>
                <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            <div className={classes.pageNumber}>{props.page}</div>
            <IconButton aria-label="delete" className={classes.button} onClick={rightClick}>
                <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
        </div>
    )
}
