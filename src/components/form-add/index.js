import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	setPublicationTitle,
	setPublicationText,
	setErrorFormPublication,
	savePublication,
} from 'src/actions';

import './form.scss';

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
			handleSave,
			handleError,
		} = this.props;

		const dataToSave = {
			id,
			title,
			text,
		};

		const error = this.validateData(dataToSave);

		event.preventDefault();

		if (error) {
			handleError(error);
			return;
		}

		handleSave();
	}

	render() {
		const {
			title,
			text,
			error,
			sending,
		} = this.props;

		return (
			<>
				<form className="form" id="form" onSubmit={this.onSubmit}>
					<div className="form__item">
						<input className="form-control"
							type="text"
							onChange={this.onChangeTitle}
							value={title}
							placeholder="Заголовок"
							disabled={sending}
						/>
					</div>
					<div className="form__item">
						<textarea className="form-control form-control--textarea"
							onChange={this.onChangeText}
							id="text"
							value={ text }
							placeholder="Текст"
							disabled={sending}
						/>
					</div>
					<div className="form__btns">
						<button className="btn btn--primary"
							disabled={sending} type="submit"
						>{ sending ? '...Сохранение' : 'Отправить' }</button>
					</div>
					{ error && <p className="text-error">{ error }</p> }
				</form>
			</>
		);
	}
};


const mapStateToProps =	({ form }) => {
	return { ...form };
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onChangeTitle: setPublicationTitle,
		onChangeText: setPublicationText,
		handleError: setErrorFormPublication,
		handleSave: savePublication(),
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FormAdd);

FormAdd.propTypes = {
	error: PropTypes.string,
	sending: PropTypes.bool,
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	title: PropTypes.string,
	text: PropTypes.string,
	handleSave: PropTypes.func,
	handleError: PropTypes.func,
	onChangeTitle: PropTypes.func,
	onChangeText: PropTypes.func,
};
