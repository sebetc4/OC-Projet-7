import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/actions/posts.actions';
import { NewPost, Post } from './components';


export default function Feed() {

	// Hooks
	const dispatch = useDispatch()

	// Store
	const posts = useSelector((state) => state.posts)

	// Get all posts
	useEffect(() => {
		dispatch(getAllPosts())
	}, [])

	return (
		<section className='feed'>
			<NewPost />
			{!posts.isLoaded ? <p>Chargement...</p> : (
				posts.data.map((post, index) => (
					<Post key={post.id} post={post} posts={posts.data} postIndex={index}/>
				))
			)}
		</section>
	);
}
