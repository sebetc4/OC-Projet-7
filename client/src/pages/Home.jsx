import React from 'react';
import { UserContext } from '../components/AppContext';

export default function Home() {
	return (
		<UserContext.Consumer>
			{context => (
				<div>
					<h1>Page d'acceuil</h1>
					<p>Bienvenu {context.user}</p>
					<button onClick={context.handleLogout}>Déconnexion</button>
				</div>
            )}
		</UserContext.Consumer>
	);
}
