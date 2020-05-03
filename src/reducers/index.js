const initialState = {
	publications: [],
	loading: true,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PUBLICATIONS_LOADED':
			return {
				publications: action.payload,
				loading: false,
			};

		default:
			return state;
	}
}

export default reducer;
