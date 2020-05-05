import React from 'react';

const PublicationListItem = ({ publication, handleEdit, handleRemove }) => {
	const {
		title,
		text,
		id,
	} = publication;

	return (
		<article>
			<header>
				<h2>{ title }</h2>
			</header>
			<p>{ text }</p>
			<div>
				<button onClick={() => handleEdit(id)} type="button">Редактировать</button>
				<button onClick={() => handleRemove(id)} type="button">Удалить</button>
			</div>
		</article>
	);
};

export default PublicationListItem;
