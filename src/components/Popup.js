export class Popup {
    constructor (selectorPopupName) {
        this._popup = document.querySelector(selectorPopupName);
        this._selectorButtonClose = this._popup.querySelector('.button_type_close');
        this._popupStyle = 'popup_opened';
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleButtonClose = this._handleButtonClose.bind(this);
        this._clickOutside = this._clickOutside.bind(this);
    }

    open() {
        this._popup.classList.add(this._popupStyle);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove(this._popupStyle);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {        
        this._popup.addEventListener('click', this._clickOutside);
        this._selectorButtonClose.addEventListener('click', this._handleButtonClose);
    }

    get selectorPopup() {
        return this._popup;
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleButtonClose() {
        this.close();        
    }

    _clickOutside(evt) {
        if (evt.target.classList.contains(this._popupStyle)) {
            this.close();
        }
    }
}
    