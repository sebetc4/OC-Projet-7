import React from 'react'
import { useDispatch } from "react-redux";
import { MenuModal } from '../../../../../../components'
import { deletePost } from '../../../../../../store/actions/posts.actions';


export default function PostMenu({ closeModal, postId, posts, postIndex, toggleDisplayModifyPost }) {

    const dispatch = useDispatch()

    const handleDeletePost = () => dispatch(deletePost(postId, postIndex))

    return (

        <MenuModal closeModal={closeModal}>
            <div className='post-menu'>
                <button
                    className='post-menu__button'
                    onClick={toggleDisplayModifyPost}
                >
                    Modifier
                </button>
                <hr className='post-menu__hr'/>
                <button
                    className='post-menu__button'
                    onClick={handleDeletePost}
                >
                    Supprimer
                </button>
            </div>
        </MenuModal>
    )
}
