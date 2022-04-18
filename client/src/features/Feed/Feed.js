import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/actions/posts.actions';
import { NewPost, Post } from './components';



export default function Feeds() {

	const dispatch = useDispatch()
	const userId = useSelector((state) => state.user.data.id)
	const posts = useSelector((state) => state.posts)

	// const [allUsersId, setAllUsersId] = useState([])

	useEffect(() => {
		dispatch(getAllPosts(userId))
	}, [])

	// useEffect(() => {
	// 	if (posts.data.lenght !== 0) {
	// 		const allUsersId = []
	// 		posts.data.forEach(post => !allUsersId.includes(post.userId) && allUsersId.push(post.userId))
	// 		setAllUsersId(allUsersId)
	// 	}
	// }, [posts])

	return (
		<section className='feed'>
			<NewPost />
			{!posts.isLoaded ? <p>Chargement...</p> : (
				posts.data.map((post, index) => (
					<Post key={post.id} post={post} />
				))
			)}
		</section>
	);
}
