import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { publicationsLoaded } from 'src/actions';
import withPublicationService from '../hoc/with-publication-service';
import PublicationListItem from '../publication-list-item';
import Loader from '../loader';

import { compose } from 'src/utils';

class PublicationList extends Component {
	componentDidMount() {
		const {
			publicationService,
			publicationsLoaded,
		} = this.props;

		publicationService.getData()
			.then(response => {
				publicationsLoaded(response);
			})
			.catch(error => console.log(error));
	}

	render() {
		const {
			publications,
			loading,
		} = this.props;

		return (
			<div>
				{ loading && <Loader /> }
				{ !loading && Array.isArray(publications) &&
					publications.map(
						publication =>
							<PublicationListItem
								{...{
									publication,
									key: publication.id
								}}
							/>
					)
				}
			</div>
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
		publicationsLoaded,
	}, dispatch)
};

export default compose(
	withPublicationService(),
	connect(mapStateToProps, mapDispatchToProps)
)(PublicationList);
