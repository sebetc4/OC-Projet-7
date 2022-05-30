import React, { useState, useEffect } from 'react'

import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { PostList } from '../../../../components';


export default function SearchPosts({ posts }) {

	// Params
	const nbPostsDisplay = 3

	// State
	const [postList, setPostList] = useState([])
	const [postListLength, setPostListLength] = useState(nbPostsDisplay)

	useEffect(() => {
		if (posts) setPostList(posts.slice(0, postListLength))
	}, [posts, posts.length, postListLength])

	const addPotsInList = () => setPostListLength(postListLength + nbPostsDisplay)

	return (
		<>
			{
				posts.length !== 0 ?
					<>
						<PostList
							type='search'
							posts={postList}
						/>
						{postListLength < posts.length &&
							<div className='search-posts-bottom'>
								<Button
									size="large"
									endIcon={<ExpandMoreIcon />}
									onClick={addPotsInList}
								>
									Afficher plus de posts
								</Button>
							</div>
						}
					</>
					:
					<p>Aucun post pour votre recherche</p>
			}
		</>
	)
}
