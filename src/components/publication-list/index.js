import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	publicationsLoaded,
	publicationsError,
	editPublication,
	removePublication,
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
								key: publication.id,
							}}
						/>
					)
				)
			}
		</div>
	);
};

class PublicationList extends Component {
	componentDidMount() {
		const {
			publicationService,
			handleSave,
			handleError,
		} = this.props;

		publicationService.getData()
			.then(response => handleSave(response))
			.catch(error => {
				console.log(error);

				handleError();
			});
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
};

const mapStateToProps =	({ publications, loading }) => {
	return {
		publications,
		loading,
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		handleEdit: editPublication,
		handleRemove: removePublication,
		handleSave: publicationsLoaded,
		handleError: publicationsError,
	}, dispatch)
};

export default compose(
	withPublicationService(),
	connect(mapStateToProps, mapDispatchToProps)
)(PublicationList);
