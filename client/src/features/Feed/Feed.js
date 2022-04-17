import React from 'react';
import { FromNowDate } from '../../components';
import { NewPost } from './components';



export default function Feeds() {

	return (
		<section className='feed'>
			<NewPost />
			<article className='feed-article'>
				<div className='feed-article-header'>
					<img className='feed-article-header__avatar' src='images/profile/avatar-profile.png' alt='avatar user'></img>
					<div className='feed-article-header__infos'>
						<p> Utilisateur Test</p>
						<FromNowDate className='test'
						/>
					</div>
				</div>
				<div className='feed-article-text'>
					<p>Voici le texte de mon premier article!!!!</p>
				</div>
				<div className='feed-article-image'>
					<img src='https://c8.alamy.com/comp/2BXBG66/news-feed-social-media-concept-illustration-flat-design-linear-style-banner-usage-for-e-mail-newsletters-headers-blog-posts-print-and-more-2BXBG66.jpg' alt='feed' />
				</div>
			</article>
		</section>
	);
}
