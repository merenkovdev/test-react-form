import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { publicationsLoaded, publicationsError } from 'src/actions';
import withPublicationService from '../hoc/with-publication-service';
import PublicationListItem from '../publication-list-item';
import Loader from '../loader';

import { compose } from 'src/utils';
import './style.scss';

const PublicationListView = ({ publications }) => {
	return (
		Array.isArray(publications) &&
			<div className="publications">
				{ publications.map(
					publication =>
						<PublicationListItem
							{...{
								publication,
								key: publication.id
							}}
						/>
				) }
			</div>
	);
};

class PublicationList extends Component {
	componentDidMount() {
		const {
			publicationService,
			publicationsLoaded,
			publicationsError,
		} = this.props;

		publicationService.getData()
			.then(response => publicationsLoaded(response))
			.catch(error => publicationsError(error));
	}

	render() {
		const {
			publications,
			loading,
			error,
		} = this.props;

		if (error) {
			return <span>{ error }</span>
		}

		return (
			loading ?
				<Loader /> :
				<PublicationListView {...{ publications }}/>
		);
	}
};

const mapStateToProps =	({ publications, loading, error }) => {
	return {
		publications,
		loading,
		error,
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		publicationsLoaded,
		publicationsError,
	}, dispatch)
};

export default compose(
	withPublicationService(),
	connect(mapStateToProps, mapDispatchToProps)
)(PublicationList);
