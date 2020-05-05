import React from 'react';
import './loader.scss';

const Loader = () => {
	return (
		<div className="loader">
			<div className="loader__bounce"></div>
			<div className="loader__bounce"></div>
			<div className="loader__bounce"></div>
		</div>
	);
};

export default Loader;
