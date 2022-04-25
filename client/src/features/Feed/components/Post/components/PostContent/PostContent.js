import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export default function PostContent({ post }) {
    return (
        <>
            {
                post.text &&
                <div className='post-content__text'>
                    <p>{post.text}</p>
                </div>
            }
            {
                post.imageUrl &&
                <div className='post-content__image'>
                    <img src={post.imageUrl} alt='feed' />
                </div>
            }
            <div className='post-content__infos'>
                <div>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <p>{post.likes}</p>
                </div>

                <div>
                    <FontAwesomeIcon icon={faComment} />
                    <p>{post.CommentPosts.length}</p>
                </div>
            </div>

        </>
    )
}
