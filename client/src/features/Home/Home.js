import React from 'react';
import { News, Todos } from './components';

export default function Home() {
	return (
		<section className='home'>
			<div className='home-columns'>
				<div className='home-columns__column-1'>
					<Todos />
				</div>
				<div className='home-columns__column-2'>
					<News />
				</div>
			</div>

		</section>

	)
}
