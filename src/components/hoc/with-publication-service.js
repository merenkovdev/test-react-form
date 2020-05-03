import React from 'react';
import { PublicationServiceConsumer } from '../publication-service-context';

const withPublicationService = () => (Wrapped) => {
	return (props) => {
		return (
			<PublicationServiceConsumer>
				{
					(publicationService) => {
						return (
							<Wrapped
								{...props}
								publicationService={publicationService}
							/>
						);
					}
				}
			</PublicationServiceConsumer>
		);
	}
};

export default withPublicationService;