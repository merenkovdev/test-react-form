import React from 'react';

const PublicationListItem = ({ publication }) => {
	return (
		<article>
			<header>
				<h2>{ publication.title }</h2>
			</header>
			<p>{ publication.description }</p>
		</article>
	);
};

export default PublicationListItem;