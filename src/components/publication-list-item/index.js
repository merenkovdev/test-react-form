import React from 'react';
import PropTypes from 'prop-types';
import './publication-list-item.scss';

const PublicationListItem = ({ publication, handleEdit, handleRemove }) => {
	const {
		title,
		text,
		id,
	} = publication;

	return (
		<article className="article">
			<header>
				<h2>{ title }</h2>
			</header>
			<p>{ text }</p>
			<div className="article__actions">
				<button className="btn btn--small btn--secondary"
					onClick={() => handleEdit(id)}
					type="button"
				>Редактировать</button>
				<button className="btn btn--small btn--secondary"
					onClick={() => handleRemove(id)}
					type="button"
				>Удалить</button>
			</div>
		</article>
	);
};

export default PublicationListItem;

PublicationListItem.propTypes = {
	publication: PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		title: PropTypes.string,
		text: PropTypes.string
	}),
	handleEdit: PropTypes.func,
	handleRemove: PropTypes.func,
};
