import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPublicationTitle, setPublicationText, addPublication } from 'src/actions';

const SERVER_REQUEST_DELAY = 1000;
const MIN_TEXT_LENGTH = 1;

class FormAdd extends Component {
	onChangeTitle = (event) => {
		this.props.onChangeTitle(event.target.value);
	}

	onChangeText = (event) => {
		this.props.onChangeText(event.target.value);
	}

	handleError = (error) => {
		// Ф-ия для обработки ошибок при выполении запроса
		console.log(error);
	}

	sendDataToSave = (data) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// Имитация создания id на сервере.
				if (data.id === 0) {
					data.id = (~~(Math.random()*1e8)).toString(16)
				}
				resolve(data);
				// Если нужно обработать ошибку
				// reject('Произошла ошибка');
			}, SERVER_REQUEST_DELAY);
		});
	}

	validateData({ title, text }) {
		let error = '';
		if (title.length < MIN_TEXT_LENGTH
			|| text.length < MIN_TEXT_LENGTH
		) {
			error = 'Заполните все поля';
		}

		return error;
	}

	onSubmit = (event) => {
		const {
			id,
			title,
			text,
		} = this.props;

		const dataToSave = {
			id,
			title,
			text,
		};

		const error = this.validateData(dataToSave);

		event.preventDefault();

		if (error) {
			return;
		}

		this.sendDataToSave({ id, title, text })
			.then((response) => this.props.handleSave(response))
			.catch((error) => handleError(error));
	}

	render() {
		const {
			title,
			text,
		} = this.props;

		return (
			<form onSubmit={this.onSubmit}>
				<label htmlFor="">
					Заголовок:
					<input type="text" onChange={this.onChangeTitle} value={title} />
				</label>
				<br/>
				<label htmlFor="text">Текст</label>
				<textarea onChange={this.onChangeText} id="text" value={ text } />
				<br/>
				<button type="submit">Отправить</button>
			</form>
		);
	}
};


const mapStateToProps =	({ form: { id, title, text }}) => {
	return {
		id,
		title,
		text,
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onChangeTitle: setPublicationTitle,
		onChangeText: setPublicationText,
		handleSave: addPublication,
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAdd);