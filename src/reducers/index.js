const emptyFormData = {
	id: 0,
	title: '',
	text: '',
	error: '',
	sending: false,
};

const initialState = {
	publications: {
		items: [],
		loading: true,
	},
	form: emptyFormData,
};

const updatePublicationItems = (items, item, idx) => {
	if (idx === -1) {
		return [
			...items,
			item
		];
	}

	return [
		...items.slice(0, idx),
		item,
		...items.slice(idx + 1)
	];
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_PUBLICATIONS_REQUEST':
			return {
				...state,
				publications: {
					items: [],
					loading: true,
				},
			};

		case 'FETCH_PUBLICATIONS_SUCCESS':
			return {
				...state,
				publications: {
					items: action.payload,
					loading: false,
				},
			};

		case 'FETCH_PUBLICATIONS_FAILURE':
			return {
				...state,
				publications: {
					items: [],
					loading: false,
				},
			};

		case 'ADD_PUBLICATION': {
			const { id } = action.payload;
			const index = state.publications.items.findIndex(
				(publication) => publication.id === id
			);

			return {
				...state,
				publications: {
					items: updatePublicationItems(state.publications.items, action.payload, index),
					loading: false,
				},
			};
		}

		case 'REMOVE_PUBLICATION': {
			const id = action.payload;
			const indexPublication = state.publications.items.findIndex(
				(publication) => publication.id === id
			);

			if (indexPublication < 0) {
				return state;
			}

			return {
				...state,
				publications: {
					items: [
						...state.publications.items.slice(0, indexPublication),
						...state.publications.items.slice(indexPublication + 1),
					],
					loading: false,
				},
			};
		}

		case 'RESET_FORM_DATA': {
			return {
				...state,
				form: emptyFormData,
			};
		}

		case 'SET_ERROR_FORM_DATA': {
			return {
				...state,
				form: {
					...state.form,
					error: action.payload,
				},
			};
		}

		case 'SAVE_PUBLICATION_REQUEST':
			return {
				...state,
				form: {
					...state.form,
					sending: true,
				},
			};

		case 'SET_PUBLICATION_TITLE':
			return {
				...state,
				form: {
					...state.form,
					title: action.payload,
				}
			};

		case 'SET_PUBLICATION_TEXT':
			return {
				...state,
				form: {
					...state.form,
					text: action.payload,
				}
			};

		case 'EDIT_PUBLICATION': {
			const id = action.payload;
			const publication = state.publications.items.find((publication) => publication.id === id);

			return {
				...state,
				form: {
					id: id,
					title: publication.title,
					text: publication.text,
				},
			};
		}

		default:
			return state;
	}
}

export default reducer;
