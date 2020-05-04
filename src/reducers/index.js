import updatePublications from './publication-list'
import updateForm from './form-add';

const reducer = (state, action) => {
	return {
		publications: updatePublications(state, action),
		form: updateForm(state, action)
	};
};

export default reducer;
