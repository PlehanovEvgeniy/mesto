import './index.css';
import {Card} from '../components/Card.js';
import {initialCards} from '../components/initial-сards.js';
import {FormValidator, validationConfig} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const formElement = document.querySelector('.form_type_edit');
const newCardElement = document.querySelector('.form_type_add');

const profileValidator = new FormValidator(validationConfig, formElement);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, newCardElement);
addCardValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_type_image', '.popup__image-title', '.popup__image');
popupImage.setEventListeners();

const initialCardList = new Section({items: initialCards, renderer: (item) => {
    const card = new Card (item, '.default-card', () => popupImage.open(item.name, item.link));
    initialCardList.addItem(card.getElement());
}}, '.elements__container');

initialCardList.renderItems();

const popupCardForm = new PopupWithForm('.popup_type_add', (item) => {
    const card = new Card (item, '.default-card', () => popupImage.open(item.name, item.link));
    initialCardList.preAddItem(card.getElement());
    popupCardForm.close();
});

addButton.addEventListener('click', () => {
    popupCardForm.open();
    popupCardForm.setEventListeners();
})

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupEditForm = new PopupWithForm('.popup_type_edit', (item) => {
    userInfo.setUserInfo(item.name, item.prof);
    popupEditForm.close();
})

editButton.addEventListener('click', () => {
    popupEditForm.open();
    popupEditForm.setEventListeners();
})