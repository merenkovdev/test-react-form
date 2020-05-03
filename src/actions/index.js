const publicationsLoaded = (publications) => {
	return {
		type: 'PUBLICATION_LOADED',
		payload: publications,
	};
};

export {
	publicationsLoaded,
};
