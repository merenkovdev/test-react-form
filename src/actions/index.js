const publicationsRequested = () => {
	return {
		type: 'FETCH_PUBLICATIONS_REQUEST',
	};
};

const publicationsLoaded = (publications) => {
	return {
		type: 'FETCH_PUBLICATIONS_SUCCESS',
		payload: publications,
	};
};

const publicationsError = () => {
	return {
		type: 'FETCH_PUBLICATIONS_FAILURE',
	};
};

const addPublication = (publication) => {
	return {
		type: 'ADD_PUBLICATION',
		payload: publication,
	};
};

const setPublicationTitle = (title) => {
	return {
		type: 'SET_PUBLICATION_TITLE',
		payload: title,
	};
};

const setPublicationText = (text) => {
	return {
		type: 'SET_PUBLICATION_TEXT',
		payload: text,
	};
};

const editPublication = (id) => {
	return {
		type: 'EDIT_PUBLICATION',
		payload: id,
	};
};

const removePublication = (id) => {
	return {
		type: 'REMOVE_PUBLICATION',
		payload: id,
	};
};

const fetchPublications = (publicationsService) => () => (dispatch) => {
	dispatch(publicationsRequested());
	publicationsService.getData()
		.then((data) => dispatch(publicationsLoaded(data)))
		.catch((err) => dispatch(publicationsError(err)));
};

export {
	setPublicationTitle,
	setPublicationText,
	addPublication,
	editPublication,
	removePublication,
	fetchPublications,
};
