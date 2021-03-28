import React, { useEffect, useState } from 'react';

import Post from './Post/Post';
import FollowRequest from './FollowRequest/FollowRequest';

export default function Inbox(props) {

    const inbox = props.data.items !== undefined
        ? props.data.items.reverse().map((d, i) => {
            if (d.type === 'Follow') {
                return <FollowRequest key={i} request={d} author={props.author} postFriendRequest={props.postFriendRequest}/>
            } else if (d.type === 'post') {
                return <Post key={i} postData={d} onLikeClicked={props.postLiked}/>;
            } else {
                console.log(d);
                return null;
            }
        })
        : null;
    return (
        <div>
            {inbox}
        </div>
    )
}
