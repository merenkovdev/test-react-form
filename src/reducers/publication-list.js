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

const updatePublications = (state, action) => {
	if (state === undefined) {
		return {
			items: [],
			loading: true,
		};
	}

	switch (action.type) {
		case 'FETCH_PUBLICATIONS_REQUEST':
			return {
				items: [],
				loading: true,
			};

		case 'FETCH_PUBLICATIONS_SUCCESS':
			return {
				items: action.payload,
				loading: false,
			};

		case 'FETCH_PUBLICATIONS_FAILURE':
			return {
				items: [],
				loading: false,
			};

		case 'ADD_PUBLICATION': {
			const { id } = action.payload;
			const index = state.publications.items.findIndex(
				(publication) => publication.id === id
			);

			return {
				...state.publications,
				items: updatePublicationItems(state.publications.items, action.payload, index),
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
				...state.publications,
				items: [
					...state.publications.items.slice(0, indexPublication),
					...state.publications.items.slice(indexPublication + 1),
				],
			};
		}

		default:
			return state.publications;
	}
};

export default updatePublications;