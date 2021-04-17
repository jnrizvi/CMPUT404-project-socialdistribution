import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Post from '../Post/Post';
import FollowRequest from './FollowRequest/FollowRequest';
import Like from './Like/Like';
import Pagination from '../Pagination/Pagination';
import Comment from './Comment/Comment';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ToggleButton from '@material-ui/lab/ToggleButton';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    controlWrapper: {
        display: 'flex'
    },
    toggle: {
        '&:focus': {
            outline: 'none',
        }
    }
  }));
  

export default function Inbox(props) {

    const classes = useStyles();

    const [publicSelected, setPublicSelected] = React.useState(false);

    let inbox = props.inbox.items !== undefined
                ? props.inbox.items.map((d, i) => {
                    if (d.type === 'Follow') {
                        return <FollowRequest key={i} request={d} author={props.author} postFriendRequest={props.postFriendRequest}/>;
                    } else if (d.type === 'post') {
                        const conversion = d.id.split('/');
                        conversion[5] = 'post'
                        return <Post
                                    key={props.inbox.items[i].id + i}
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
                    } else if (d.type === 'comment') {
                        return <Comment key={i} data={d}/>;
                    }
                })
                : null;
    
    let pub = props.publicPosts.length !== 0
                ? props.publicPosts.map((d, i) => {
                    if (d.type === 'Follow') {
                        return <FollowRequest key={i} request={d} author={props.author} postFriendRequest={props.postFriendRequest}/>;
                    } else if (d.type === 'post') {
                        const conversion = d.id.split('/');
                        conversion[5] = 'post'
                        return <Post
                                    key={props.publicPosts[i].id + i}
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
                    } else if (d.type === 'comment') {
                        return <Comment key={i} data={d}/>;
                    }
                })
                : null;

    const inboxComponent = <div>
        {inbox}
        <Pagination page={props.inboxPage} onClickHandler={props.inboxPaginationHandler}/>
    </div>

    const publicComponent = <div>
        {pub}
        <Pagination page={props.publicPage} onClickHandler={props.publicPaginationHandler}/>
    </div>;

    
    return (
        <div>
            <div className={classes.controlWrapper}>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={props.deleteInbox}
                >
                    Destroy Inbox
                </Button>
                <ToggleButton
                    value="check"
                    className={classes.toggle}
                    selected={publicSelected}
                    onChange={() => {
                        setPublicSelected(!publicSelected);
                    }}
                    >
                    <PublicIcon />
                </ToggleButton>
            </div>
            { publicSelected ? publicComponent : inboxComponent }
        </div>
    );
}
