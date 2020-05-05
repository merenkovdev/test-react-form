import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	editPublication,
	removePublication,
	fetchPublications,
} from 'src/actions';
import withPublicationService from '../hoc/with-publication-service';
import PublicationListItem from '../publication-list-item';
import Loader from '../loader';

import { compose } from 'src/utils';
import './style.scss';

const PublicationListView = ({ publications, handleRemove, handleEdit }) => {
	return (
		<div className="publications">
			{ !Array.isArray(publications) || !publications.length ?
				<span>Список постов пуст</span>
			:
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
				<Loader /> :
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
		handleEdit: editPublication,
		handleRemove: removePublication,
		fetchPublications: fetchPublications(publicationService),
	}, dispatch);
};

export default compose(
	withPublicationService(),
	connect(mapStateToProps, mapDispatchToProps)
)(PublicationList);
