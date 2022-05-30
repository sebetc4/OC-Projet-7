import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, resetPosts } from '../../store/actions/posts.actions';
import { CreatePost } from './components';

import { Button, CircularProgress } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { Loader, PostList } from '../../components';

export default function Feed() {

	// Params
	const nbPostsDisplay = 5

	// Hooks
	const dispatch = useDispatch()

	// Store
	const posts = useSelector((state) => state.posts)

	// State
	const [postsIsLoading, setPostsIsLoading] = useState(false)
	const [postsListLength, setPostsListLength] = useState(nbPostsDisplay)

	// Get initial posts
	useEffect(() => {
		dispatch(resetPosts())
		dispatch(fetchPosts(0, nbPostsDisplay))
		return () => {
			dispatch(resetPosts())
		}
	}, [dispatch])

	// Get more posts
	useEffect(() => {
		if (postsListLength !== nbPostsDisplay) {
			dispatch(fetchPosts(postsListLength - nbPostsDisplay, nbPostsDisplay))
			setPostsIsLoading(false)
		}
	}, [postsListLength, dispatch])

	useEffect(() => {
		if (postsIsLoading)
			setPostsListLength(postsListLength + nbPostsDisplay)
	}, [postsIsLoading])

	useEffect(() => {
		if (!posts.allPostsFetch)
			window.addEventListener('scroll', loadMorePost)
		else
			window.removeEventListener('scroll', loadMorePost)
		return () => window.removeEventListener('scroll', loadMorePost)
	}, [posts.allPostsFetch])

	const loadMorePost = () => {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			setPostsIsLoading(true)
		}
	}

	const goToTopPage = () => window.scrollTo({ top: 0, behavior: 'smooth' });

	return (

		<section className='feed'>

			{posts.isLoaded && posts.type === 'feed' ?
				<>
					<CreatePost />
					<PostList
						type='feed'
						posts={posts.data}
					/>
					<div className='feed-bottom'>
						{
							postsIsLoading && <CircularProgress />
						}
						{
							(posts.allPostsFetch && posts.data.length !== 0) &&
							<Button
								onClick={goToTopPage}
								endIcon={<ArrowBackIosRoundedIcon />}
							>
								Fin des posts. Remonter la page
							</Button>
						}
						{
							posts.data.length === 0 &&
							<div>
								<p>Aucun post. Soyez le premier à partager avec vos collègues.</p>
							</div>
						}
					</div>
				</>
				:
				<Loader />
			}
		</section>
	);
}