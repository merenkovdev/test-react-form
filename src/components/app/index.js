import React from 'react';
import PublicationList from '../publication-list';
import FormAdd from '../form-add';

const App = () => {
	return (
		<div className="main">
			<h1>Форма</h1>
			<FormAdd />
			<PublicationList />
		</div>
	);
};

export default App;