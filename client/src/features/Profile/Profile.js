import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ProfileHeader, ProfileUserInformation, ProfileUserBio, ProfileUserPosts } from './components';
import { Loader } from '../../components';


export default function Profile() {

	const [profileData, setProfileData] = useState(null)
	const [profileDataIsLoaded, setProfileDataIsLoaded] = useState(false)

	const params = useParams();
	const navigate = useNavigate()

	useEffect(() => {
		const getProfileData = async () => {
			try {
				const user = await axios.get(`/api/user/${params.userId}`)
				setProfileData(user.data)
				setProfileDataIsLoaded(true)
			} catch (err) {
				navigate('/home', { replace: true })
			}
		}
		getProfileData()
	}, [])

	return (
		<>
			{
				profileDataIsLoaded ?
					<section className='profile'>
						<ProfileHeader
							profileData={profileData}
						/>
						<div className='profile-row-1-2'>
							<div className='profile-row-1-2__column-1'>
								<ProfileUserInformation
									profileData={profileData}
								/>
								<ProfileUserBio
									profileData={profileData}
								/>
							</div>
							<div className='profile-row-1-2__column-2'>
							<ProfileUserPosts
								profileData={profileData}
							/>
							</div>
						</div>
					</section > :
					<Loader />
			}
		</>
	)
}