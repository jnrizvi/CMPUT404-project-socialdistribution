import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Navbar from '../components/Navbar/Navbar';
import PostCreator from '../components/PostCreator/PostCreator';
import PostSorter from '../components/PostSorter/PostSorter';
import Inbox from '../components/Inbox/Inbox';
import PeopleList from '../components/PeopleList/PeopleList';
import Followers from '../components/Followers/Followers';
import GithubStream from '../components/GithubStream/GithubStream';

import {
    postNewPost,
    getInbox,
    postLike,
    postComment,
    getLikes,
    postSharePost,
    postNewPrivatePost,
    getComments,
    getCommentsRemote,
    destroyInbox,
    getPublicPosts
}
from "../actions/posts";
import {
    postSearchDisplayName,
    postFriendRequest,
    getGithub,
    getFriends,
    getFollowers,
    getFollowing,
    deleteFriend
} from '../actions/users';

import { object } from 'prop-types';

const useStyles = makeStyles(() => ({
    posts: {
    },
    feed: {
        backgroundColor: "#EFEFEF"
    },
    container: {
        padding: '0px 10%'
    }
}));

// pretend this is my author id to tell between my posts and others' posts
// const stuffFromAuthContext = {
//     "userId": "http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e"
// }

function Feed(props) {
    const classes = useStyles();
    const history = useHistory();
    const postClasses = [classes.posts, 'col-9', 'pe-5']
    const container = ['container-fluid', classes.container];

    const postFriendRequest = (post, object_id) => {
        props.postFriendRequest(post, props.author_id, _.last(object_id.url.split('/')), props.token);
    }
    
    const [loaded, setLoaded] = useState(false);
    const [likesLoaded, setLikesLoaded] = useState(false);
    const [inboxPage, setInboxPage] = useState(1);
    const [publicPage, setPublicPage] = useState(1);

    const initialLoad = () => {
        if (!loaded) {
            props.getInbox(props.author_id, props.token, inboxPage);
            props.getPublicPosts(props.token, publicPage);
            props.getFriends(props.author_id, props.token);
            props.getFollowers(props.author_id, props.token);
            props.getFollowing(props.author_id, props.token);
            const github = props.author.github.split('/');
            props.getGithub(github[github.length - 1]);
            props.postSearchDisplayName(props.token);
            setLoaded(true);
        }
    }

    const inboxPaginationHandler = (direction) => {
        if (direction === 'left' && inboxPage !== 1) {
            setInboxPage(inboxPage - 1);
            props.getInbox(props.author_id, props.token, inboxPage-1);
        } else if (direction === 'right') {
            setInboxPage(inboxPage + 1);
            props.getInbox(props.author_id, props.token, inboxPage+1);
        }
    }

    const publicPaginationHandler = (direction) => {
        if (direction === 'left' && publicPage !== 1) {
            setPublicPage(publicPage - 1);
            props.getPublicPosts(props.token, publicPage - 1);
        } else if (direction === 'right') {
            setPublicPage(publicPage + 1);
            props.getPublicPosts(props.token, publicPage + 1);
        }
    }

    const commentPaginationHandler = (direction, post, page) => {
        props.getComments(post, props.token, page, !post.id.includes(props.author.host));
    }

    const createNewPost = (post, privatePerson) => {
        const description = 'this is a post';
        const finalPost = {
            ...post,
            author: props.author,
            type: 'post',
            description
        }

        if (privatePerson) {
            props.postNewPrivatePost(finalPost, _.last(privatePerson.id.split('/')), props.token)
            return;
        }
        props.postNewPost(finalPost, props.token);
    }

    const postLiked = (post) => {
        const body = {
            '@context': "https://www.w3.org/ns/activitystreams",
            summary: `${props.author.displayName} Likes your post`,
            type: 'Like',
            author: props.author,
            object: post.id
        }
        props.postLike(body, post.author, props.token);
    }

    const commentLiked = (comment) => {
        const body = {
            '@context': "https://www.w3.org/ns/activitystreams",
            summary: `${props.author.displayName} Likes your comment`,
            type: 'Like',
            author: props.author,
            object: comment.id
        }
        props.postLike(body, comment.author, props.token);
    }

    const createComment = (body, post) => {
        props.postComment(body, post, props.token);
    }

    const sharePost = (post) => {
        props.postSharePost(post, props.token, props.author_id);
    }

    const unfriend = (friend) => {
        props.deleteFriend(props.author, friend, props.token);
    }

    const deleteInbox = () => {
        props.destroyInbox(props.author_id, props.token);
    }

    React.useEffect(() => {
        if (_.isEmpty(props.author)) {
            history.push("/login");
        } else {
            initialLoad();
        }

        if (!_.isEmpty(props.post)) {
            if (props.post.unlisted) {
                window.open(props.post.id, "_blank");
            }
        }

        if (!_.isEmpty(props.inbox) && !_.isEmpty(props.publicPosts)) {
            if (props.inbox.items && props.inbox.items.length !== 0) {
                _.forEach(props.inbox.items.concat(props.publicPosts), d => {
                    if (d.type === 'post' && d.visibility === 'FRIENDS') {
                        const post = d.id.split('/');
                        post[5] = 'post';
                        props.getLikes(
                        {
                            ...d,
                            id: post.join('/')
                        }, props.token);
                    }

                    // get comments of each post
                    if (d.type === 'post') {
                        if (d.id.includes(props.author.host)) {
                            props.getComments(d, props.token, 1);
                        } else {
                            props.getCommentsRemote(d, props.token, d.comments);
                        }
                    }
                });
            }
        }
    }, [props.author, props.inbox, props.publicPosts]);

    return (
        <div 
            className={classes.feed}
        >
            <Navbar />
            <div className={container.join(' ')}>
                <div className='row align-items-start'>
                    <div className={postClasses.join(' ')}>
                        <PostCreator createNewPost={createNewPost} allAuthors={props.all_authors}/>
                        <PostSorter />
                        <GithubStream activities={props.github_activity}/>
                        <Inbox
                            inbox={props.inbox}
                            publicPosts={props.publicPosts}
                            author={props.author}
                            postFriendRequest={postFriendRequest}
                            postLiked={postLiked}
                            commentLiked={commentLiked}
                            createComment={createComment}
                            sharePost={sharePost}
                            likes={props.likes}
                            comments={props.comments}
                            deleteInbox={deleteInbox}
                            inboxPage={inboxPage}
                            publicPage={publicPage}
                            inboxPaginationHandler={inboxPaginationHandler}
                            publicPaginationHandler={publicPaginationHandler}
                            commentPaginationHandler={commentPaginationHandler}
                        />
                    </div>
                    <div className='col-3 ps-5'>
                        <PeopleList
                            people={_.uniqBy(props.friends.items, 'id')}
                            followers={_.uniqBy(props.followers.items, 'id')}
                            all_authors={props.all_authors}
                            author={props.author}
                            postFriendRequest={postFriendRequest}
                            unfriend={unfriend}
                            static={false}
                            title={'Friends'}
                        />
                        <PeopleList
                            people={_.uniqBy(props.followers.items, 'id')}
                            static={true}
                            title={'Followers'}
                        />
                        <PeopleList
                            people={_.uniqBy(props.following.items, 'id')}
                            static={true}
                            title={'Following'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    post: state.posts.post,
    author: state.users.user,
    author_id: state.users.user_id,
    all_authors: state.users.displayNameSearchResult,
    inbox: state.posts.inbox,
    github_activity: state.users.github_activity,
    friends: state.users.friends,
    followers: state.users.followers,
    token: state.users.basic_token,
    following: state.users.following,
    likes: state.posts.likes,
    comments: state.posts.comments,
    publicPosts: state.posts.publicPosts
});
  
export default connect(mapStateToProps,
    {
        postNewPost,
        postSearchDisplayName,
        getInbox,
        postFriendRequest,
        getGithub,
        getFriends,
        getFollowers,
        postLike,
        postComment,
        getLikes,
        postSharePost,
        postNewPrivatePost,
        deleteFriend,
        getFollowing,
        getComments,
        getCommentsRemote,
        destroyInbox,
        getPublicPosts
    })(Feed);
