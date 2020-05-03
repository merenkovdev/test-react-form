const publicationsLoaded = (publications) => {
	return {
		type: 'PUBLICATIONS_LOADED',
		payload: publications,
	};
};

export {
	publicationsLoaded,
};
