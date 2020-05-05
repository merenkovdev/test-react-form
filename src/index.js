import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import PublicationService from './services/publication-service';
import { PublicationServiceProvider } from './components/publication-service-context';

import store from './store';

import './styles/base.scss';

const publicationService = new PublicationService();

ReactDOM.render(
	<Provider store={store}>
		<PublicationServiceProvider value={publicationService}>
			<App />
		</PublicationServiceProvider>
	</Provider>,
	document.getElementById('root'),
);
