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

const resetFormPublication = () => {
	return {
		type: 'RESET_FORM_DATA',
	};
};

const setErrorFormPublication = (error) => {
	return {
		type: 'SET_ERROR_FORM_DATA',
		payload: error,
	};
};

const savePublicationRequest = () => {
	return {
		type: 'SAVE_PUBLICATION_REQUEST',
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

const savePublication = () => () => (dispatch, getState) => {
	const SERVER_REQUEST_DELAY = 1000;
	const { form: { id, title, text }} = getState();

	const sendDataToSave = (data) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// Имитация создания id на сервере.
				if (data.id === 0) {
					data.id = (~~(Math.random()*1e8)).toString(16)
				}
				resolve(data);
				// Если нужно обработать ошибку
				// reject('Произошла ошибка при сохранении');
			}, SERVER_REQUEST_DELAY);
		});
	}

	dispatch(savePublicationRequest());
	sendDataToSave({ id, title, text })
		.then((response) => dispatch(addPublication(response)))
		.then(() => dispatch(resetFormPublication()))
		.catch((error) => dispatch(setErrorFormPublication(error)));
};

export {
	setPublicationTitle,
	setPublicationText,
	setErrorFormPublication,
	savePublication,
	editPublication,
	removePublication,
	fetchPublications,
};
