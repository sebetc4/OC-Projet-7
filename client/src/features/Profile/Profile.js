import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import axios from "axios";
import { CreationDate } from '../../components';

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
		<section className='profile'>
			<img className='profile__cover-image' alt='Couverture de la page de profil' src={profilData.coverUrl} />
			<div className='profile-general-information'>
				<div className='profile-general-information__avatar'>
					<img alt={'avatar de l\'ustilisateur'} src={profilData.avatarUrl} />
				</div>
				<h3 className='profile-general-information__name' >{`${profilData.firstName} ${profilData.lastName}`}</h3>
			</div>
			<div className='profile-secondary-information'>
				<div className='profile-informations'>
					<h3 className='profile-informations__title'>Mes informations:</h3>
					<div className='profile-informations__text'>
						<p >{'Membre depuis le '}<CreationDate date={profilData.createdAt} /></p>
					</div>
				</div>
				<div className='profile-bio'>
					<h3 className='profile-bio__title'>Ma biographie:</h3>
					<p className='profile-bio__text'>{profilData.bio ? profilData.bio : 'Briographie vide...'}</p>
				</div>
			</div>
		</section>

	)
}