import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";

import { ProfileTop, ProfileUserInformation, ProfileUserBio, ProfileUserPosts } from './components';
import { Loader } from '../../components';
import { resetPosts, fetchPostsSucess } from '../../store/actions/posts.actions';


export default function Profile() {

	// Hooks
	const params = useParams();
	const navigate = useNavigate()
	const dispatch = useDispatch()

	// Store
	const user = useSelector((state) => state.user.data)
	const posts = useSelector((state) => state.posts)

	// State
	const [profileData, setProfileData] = useState(null)
	const [profileDataIsLoaded, setProfileDataIsLoaded] = useState(false)

	// Fetch profileData
	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				setProfileDataIsLoaded(false)
				const user = await axios.get(`/api/user/${params.userId}`)
				dispatch(fetchPostsSucess(user.data.Posts, 'profile', true))
				setProfileData(user.data)
				setProfileDataIsLoaded(true)
			} catch (err) {
				navigate('/home', { replace: true })
			}
		}
		fetchProfileData()
		return () => dispatch(resetPosts())
	}, [navigate, params.userId, dispatch])

	const handleFollow = () => {
		const { id, firstName, lastName, avatarUrl } = user
		const followers = [...profileData.followers]
		followers.push({ id, firstName, lastName, avatarUrl })
		setProfileData({ ...profileData, followers })
	}

	const handleUnfollow = () => {
		let followers = [...profileData.followers]
		followers = followers.filter(u => u.id !== user.id)
		setProfileData({ ...profileData, followers })
	}

	return (
		<>
			{
				profileDataIsLoaded ?
					<div className='profile'>
						<ProfileTop
							profileData={profileData}
							handleFollow={handleFollow}
							handleUnfollow={handleUnfollow}
						/>
						<div className='profile-columns'>
							<div className='profile-columns__column-1'>
								<ProfileUserInformation
									profileData={profileData}
								/>
								<ProfileUserBio
									profileData={profileData}
								/>
							</div>
							<div className='profile-columns__column-2'>
								<ProfileUserPosts
									profileData={profileData}
									posts={posts.data}
								/>
							</div>
						</div>
					</div > :
					<Loader />
			}
		</>
	)
}