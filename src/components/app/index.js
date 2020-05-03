import React from 'react';
import withPublicationService from '../hoc/with-publication-service';

const App = ({ publicationService }) => {
	return <h1>Заголовок</h1>;
};

export default withPublicationService()(App);