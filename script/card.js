import {showPreviewPicture} from './scripts.js'
export class Card {
    constructor (data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._element = this._getTemplate();

        this._toggleLike = this._toggleLike.bind(this);
        this._removeElement = this._removeElement.bind(this);
                
        const cardImage = this._element.querySelector('.element__image');
        cardImage.src = this._link;
        cardImage.alt = this._name + '.';

        this._likeButton = this._element.querySelector('.element__like');
        this._removeButton = this._element.querySelector('.element__delete');
        this._elementImage = this._element.querySelector('.element__image');
        
        this._element.querySelector('.element__text').textContent = this._name;
        this._setEventListeners();
    }

    getElement() {        
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
        this._destroyEventListener()
    }

    _setEventListeners() {        
        this._likeButton.addEventListener('click', this._toggleLike);
        
        this._removeButton.addEventListener('click', this._removeElement);
        
        this._elementImage.addEventListener('click', () => {
            showPreviewPicture(this._name, this._link);
        });
    }

    _destroyEventListener() {
        this._likeButton.removeEventListener('click', this._toggleLike);
        this._removeButton.removeEventListener('click', this._removeElement);
    }
}