import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setPublicationTitle, setPublicationText, savePublication } from 'src/actions';

const MIN_TEXT_LENGTH = 1;

class FormAdd extends Component {
	onChangeTitle = (event) => {
		this.props.onChangeTitle(event.target.value);
	}

	onChangeText = (event) => {
		this.props.onChangeText(event.target.value);
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

		this.props.handleSave();
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
		handleSave: savePublication(),
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAdd);