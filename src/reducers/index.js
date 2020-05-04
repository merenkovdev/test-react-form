const initialState = {
	publications: [],
	loading: true,
	form: {
		id: 0,
		title: '',
		text: '',
	}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
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

		case 'ADD_PUBLICATION': {
			const { id } = action.payload;
			const index = state.publications.findIndex((publication) => publication.id === id);

			if (index < 0) {
				return {
					...state,
					form: {
						id: 0,
						title: '',
						text: '',
					},
					publications: [
						...state.publications,
						{ ...action.payload }
					],
				};
			}

			return {
				...state,
				form: {
					id: 0,
					title: '',
					text: '',
				},
				publications: [
					...state.publications.slice(0, index),
					{ ...action.payload },
					...state.publications.slice(index + 1),
				],
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
			const indexPublication = state.publications.findIndex((publication) => publication.id === id);
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
