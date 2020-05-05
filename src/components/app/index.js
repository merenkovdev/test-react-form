import React from 'react';
import PublicationList from '../publication-list';
import FormAdd from '../form-add';
import './app.scss';

const App = () => {
	return (
		<div className="main">
			<h1>Форма редатирования постов</h1>
			<FormAdd />
			<PublicationList />
		</div>
	);
};

export default App;