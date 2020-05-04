const emptyFormData = {
	id: 0,
	title: '',
	text: '',
	error: '',
	sending: false,
};

const updateForm = (state, action) => {
	if (state === undefined) {
		return emptyFormData;
	}

	switch (action.type) {
		case 'RESET_FORM_DATA': {
			return emptyFormData;
		}

		case 'SET_ERROR_FORM_DATA': {
			return {
				...state.form,
				error: action.payload,
			};
		}

		case 'SAVE_PUBLICATION_REQUEST':
			return {
				...state.form,
				sending: true,
			};

		case 'SET_PUBLICATION_TITLE':
			return {
				...state.form,
				title: action.payload,
			};

		case 'SET_PUBLICATION_TEXT':
			return {
				...state.form,
				text: action.payload,
			};

		case 'EDIT_PUBLICATION': {
			const id = action.payload;
			const publication = state.publications.items.find((publication) => publication.id === id);

			return {
				...state.form,
				id: id,
				title: publication.title,
				text: publication.text,
			};
		}

		default:
			return state.form;
	}
};

export default updateForm;