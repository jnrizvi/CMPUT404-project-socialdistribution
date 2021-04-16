import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Post from '../Post/Post';
import FollowRequest from './FollowRequest/FollowRequest';
import Like from './Like/Like';
import Pagination from '../Pagination/Pagination';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


export default function Inbox(props) {

    const classes = useStyles();

    const inbox = props.data.items !== undefined
        ? props.data.items.map((d, i) => {
            if (d.type === 'Follow') {
                return <FollowRequest key={i} request={d} author={props.author} postFriendRequest={props.postFriendRequest}/>;
            } else if (d.type === 'post') {
                const conversion = d.id.split('/');
                conversion[5] = 'post'
                return <Post
                            key={i}
                            postData={d}
                            postLiked={props.postLiked}
                            commentLiked={props.commentLiked}
                            author={props.author}
                            createComment={props.createComment}
                            sharePost={props.sharePost}
                            editMode={false}
                            likes={props.likes[conversion.join('/')]}
                            comments={props.comments[d.id]}
                            commentPaginationHandler={props.commentPaginationHandler}
                        />;
            } else if (d.type === 'like') {
                return <Like key={i} data={d}/>;
            }
        })
        : null;
    
    return (
        <div>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={props.deleteInbox}
            >
                Destroy Inbox
            </Button>
            {inbox}
            <Pagination page={props.inboxPage} onClickHandler={props.inboxPaginationHandler}/>
        </div>
    );
}
