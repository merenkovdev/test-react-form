const emptyFormData = {
	id: 0,
	title: '',
	text: '',
};

const initialState = {
	publications: [],
	loading: true,
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
				publications: [],
				loading: true,
			};

		case 'FETCH_PUBLICATIONS_SUCCESS':
			return {
				...state,
				publications: action.payload,
				loading: false,
			};

		case 'FETCH_PUBLICATIONS_FAILURE':
			return {
				...state,
				publications: [],
				loading: false,
			};

		case 'RESET_FORM_DATA': {
			return {
				...state,
				form: emptyFormData,
			};
		}

		case 'ADD_PUBLICATION': {
			const { id } = action.payload;
			const index = state.publications.findIndex(
				(publication) => publication.id === id
			);

			return {
				...state,
				publications: updatePublicationItems(state.publications, action.payload, index),
			};
		}

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
			const publication = state.publications.find((publication) => publication.id === id);

			return {
				...state,
				form: {
					id: id,
					title: publication.title,
					text: publication.text,
				},
			};
		}

		case 'REMOVE_PUBLICATION': {
			const id = action.payload;
			const indexPublication = state.publications.findIndex(
				(publication) => publication.id === id
			);

			if (indexPublication < 0) {
				return state;
			}

			return {
				...state,
				publications: [
					...state.publications.slice(0, indexPublication),
					...state.publications.slice(indexPublication + 1),
				],
			};
		}

		default:
			return state;
	}
}

export default reducer;
