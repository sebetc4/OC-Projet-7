import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../store/actions/posts.actions';
import { CreatePost, PostCard } from './components';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Loader } from '../../components';


export default function Feed() {

	// Hooks
	const dispatch = useDispatch()

	// State
	const [postsList, setPostsList] = useState(null)
	const [postsListLength, setPostsListLength] = useState(5)

	// Store
	const allPosts = useSelector((state) => state.posts)

	// Get all posts
	useEffect(() => {
		dispatch(getAllPosts())
	}, [])

	useEffect(() => {
		if (allPosts) setPostsList(allPosts.data.slice(0, postsListLength))
	}, [allPosts, postsListLength])

	const addPostsListsLength = () => setPostsListLength(postsListLength + 5)

	return (
		<>
			{!allPosts.isLoaded ?
				<Loader /> :
				(
					<section className='feed'>
						<CreatePost />
						{
							postsList && postsList.map((post, index) => (
								<PostCard key={post.id} post={post} postIndex={index} />
							))
						}
						{
							allPosts.data.length > postsListLength &&
							<div className='feed-button-more-container'>
								<Button
									size="large"
									endIcon={<ExpandMoreIcon />}
									onClick={addPostsListsLength}
								>
									Afficher plus
								</Button>
							</div>
						}
					</section>
				)
			}
		</>
	);
}
