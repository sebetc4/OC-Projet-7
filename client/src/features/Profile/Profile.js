import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import axios from "axios";

export default function Profile() {

	const [profilData, setProfilData] = useState({})

	const params = useParams();
	const navigate = useNavigate()
	const userData = useSelector((state) => state.user.data)


	// Récupération du profil de l'utilisateur redirection en cas d'échec
	useEffect(() => {
		const handleProfilData = (data) => setProfilData(data)
		const getProfilData = () => {
			axios.get(`/api/user/${params.userId}`)
				.then(res => handleProfilData(res.data))
				.catch(() => navigate('/home', { replace: true }))
		}
		userData.id === parseInt(params.userId) ? handleProfilData(userData) : getProfilData()
	}, [params.userId, userData, navigate])


	return (
		<section className='profil'>
			<img className='profil__cover-picture' alt='Couverture de la page de profil' src={profilData.coverUrl ? profilData.coverUrl : '/images/profile/cover-profile.jpg'} />
			<div className='profil-user-general-information'>
				<img className='profil-user-general-information__user-picture' alt={'Personne ou représentation de l\'utilisateur'} src={profilData.avatarUrl ? profilData.avatarUrl : 'images/profile/avatar-profile.png' } />
				<h2 className='profil-user-general-information__user-usurname' >{`${profilData.firstName} ${profilData.lastName}`}</h2>
			</div>
			<div className='profil-user-bio'>
				<p className='profil-user-bio__text'>{profilData.bio}</p>
			</div>
		</section>

	)
}