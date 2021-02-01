import {showPreviewPicture} from './scripts.js'
export class Card {
    constructor (data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;        
    }

    generateCard() {        
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._element.querySelector('.element__text').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name + '.';
        this._setEventListeners();
        return this._element;
    }
    
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
        return cardElement;
    }
    
    _toggleLike(evt) {
        const elementTarget = evt.target;
        elementTarget.classList.toggle('button_clicked');
    }

    _removeElement(evt) {
        const elementTarget = evt.target.closest('.element');
        elementTarget.remove();
    }

    _setEventListeners() {
        const likeButton = this._element.querySelector('.element__like');
        likeButton.addEventListener('click', (evt) => {
            this._toggleLike(evt);
        })

        const removeButton = this._element.querySelector('.element__delete');
        removeButton.addEventListener('click', (evt) => {
            this._removeElement(evt);
        });

        const elementImage = this._element.querySelector('.element__image');
        elementImage.addEventListener('click', () => {
            showPreviewPicture(this._name, this._link);
        })
    }    
}