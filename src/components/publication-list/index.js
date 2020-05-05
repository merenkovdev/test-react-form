import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	handlePublicationEditing,
	removePublication,
	fetchPublications,
} from 'src/actions';
import withPublicationService from '../hoc/with-publication-service';
import PublicationListItem from '../publication-list-item';
import Loader from '../loader';

import { compose } from 'src/utils';
import './style.scss';

const PublicationListView = ({ publications, handleRemove, handleEdit }) => {
	const postsAvailable = Array.isArray(publications) && publications.length;

	return (
		<div className={`publications${ !postsAvailable ? ' publications--empty' : '' }`}>
			{ postsAvailable ?
				publications.map(
					publication => (
						<PublicationListItem
							{...{
								publication,
								handleRemove,
								handleEdit,
							}}
							key={publication.id}
						/>
					)
				)
			:
				<span>Список постов пуст</span>
			}
		</div>
	);
};

class PublicationList extends Component {
	componentDidMount() {
		this.props.fetchPublications();
	}

	render() {
		const {
			publications,
			loading,
			handleRemove,
			handleEdit,
		} = this.props;

		return (
			loading ?
				<div className="publications publications--empty">
					<Loader />
				</div>
				:
				<PublicationListView
					{...{
						publications,
						handleRemove,
						handleEdit,
					}}
				/>
		);
	}
}

const mapStateToProps =	({ publications: { items, loading }}) => {
	return {
		publications: items,
		loading,
	};
};

const mapDispatchToProps = (dispatch, { publicationService }) => {
	return bindActionCreators({
		handleEdit: handlePublicationEditing(),
		handleRemove: removePublication,
		fetchPublications: fetchPublications(publicationService),
	}, dispatch);
};

export default compose(
	withPublicationService(),
	connect(mapStateToProps, mapDispatchToProps)
)(PublicationList);
