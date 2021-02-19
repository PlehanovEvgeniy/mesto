import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor (selectorPopupName, callBackSubmitForm) {
        super(selectorPopupName);
        this._callBackSubmitForm = callBackSubmitForm;
        this._selectorForm = this.selectorPopup.querySelector('.form');
        this._submitButton = this._selectorForm.querySelector('.button_type_save');
        this._formSubmitter = this._formSubmitter.bind(this);
    }

    renderLoading(isLoading) {
        this._submitButton.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
    }

    setEventListeners() {
        super.setEventListeners();
        this._selectorForm.addEventListener('submit', this._formSubmitter); 
    }

    close() {
        this._selectorForm.reset();
        super.close();
    }

    _getInputValues() {
        const inputList = this._selectorForm.querySelectorAll('.form__item');
        const formValues = {};
        inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    _formSubmitter(evt) {
        evt.preventDefault();
        this._callBackSubmitForm(this._getInputValues());
    }
}