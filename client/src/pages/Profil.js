import React from 'react';

export default function Home() {
	return (
		<section className='profil'>
			<img className='profil__cover-picture' alt='Couverture de la page de profil' src='https://d3e1m60ptf1oym.cloudfront.net/f9dec613-6446-4ffa-8043-2aa443b55130/pose-longue-voiture-voie-express-bis_xgaplus.jpg' />


			<div className='profil-user-general-information'>
				<img className='profil-user-general-information__user-picture' alt={'Personne ou représentation de l\'utilisateur'} src='https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1606/tuktukdesign160600119/59070200-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%82%A8%EC%9E%90-%ED%94%84%EB%A1%9C%ED%95%84-%EC%82%AC%EC%97%85%EA%B0%80-%EC%95%84%EB%B0%94%ED%83%80-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98%EC%9D%98-%EC%82%AC%EB%9E%8C-%EC%95%84%EC%9D%B4%EC%BD%98.jpg' />
				<h2 className='profil-user-general-information__user-usurname' >Nom d'utilisateur</h2>
			</div>
			<div className='profil-user-bio'>
				<p className='profil-user-bio__text'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
			</div>


		</section>
	);
}