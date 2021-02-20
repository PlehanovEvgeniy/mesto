import {Popup} from './Popup.js';

export class PopupWithSubmit extends Popup {
    constructor (selectorPopupName, handleFormSubmit) {
        super(selectorPopupName);
        this._handleFormSubmit = handleFormSubmit;
        this._selectorForm = this.selectorPopup.querySelector('.form');
        this._submitButton = this._selectorForm.querySelector('.button_type_save');
        this._formSubmitter = this._formSubmitter.bind(this);
        this._props = {};
    }

    open(props) {
        super.open();
        this._props = props;
    }

    renderLoading(isLoading) {
        this._submitButton.textContent = isLoading ? 'Удаление...' : 'Удалено';
    }

    setEventListeners() {
        super.setEventListeners();
        this._selectorForm.addEventListener('submit', this._formSubmitter);
    }

    _formSubmitter (evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._props);
    }
}