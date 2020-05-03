const initialState = {
	publication: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PUBLICATIONS_LOADED':
			return {
				publication: action.payload,
			};

		default:
			return state;
	}
}

export default reducer;
