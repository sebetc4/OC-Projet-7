import React from 'react';
import { News, Todos } from './components';

export default function Home() {
	return (
		<section className='home'>
			<div className='home-column-1'>
				<Todos />
			</div>
			<div className='home-column-2'>
				<News />
			</div>
		</section>

	)
}
