import React from 'react';
import withPublicationService from '../hoc/with-publication-service';
import PublicationList from '../publication-list';

const App = ({ publicationService }) => {
	return (
		<>
			<h1>Заголовок</h1>
			<PublicationList />
		</>
	);
};

export default withPublicationService()(App);