const publicationsLoaded = (publications) => {
	return {
		type: 'FETCH_PUBLICATIONS_SUCCESS',
		payload: publications,
	};
};

const publicationsError = (error) => {
	return {
		type: 'FETCH_PUBLICATIONS_FAILURE',
		payload: error,
	};
};

export {
	publicationsLoaded,
	publicationsError,
};
