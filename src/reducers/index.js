const initialState = {
	publications: [],
	loading: true,
	error: '',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_PUBLICATIONS_SUCCESS':
			return {
				publications: action.payload,
				loading: false,
			};

		case 'FETCH_PUBLICATIONS_FAILURE':
			return {
				publications: [],
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
}

export default reducer;
