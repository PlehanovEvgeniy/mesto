import {Card} from './card.js';
const editButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.button_type_close');
const addButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');

const nameOnProfile = document.querySelector('.profile__title');
const profOnProfile = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.form__item_type_name');
const profInput = document.querySelector('.form__item_type_job');
const cardNameInput = document.querySelector('.form__item_type_card-name');
const cardLinkInput = document.querySelector('.form__item_type_card-link');

const imageTitle = document.querySelector('.popup__image-title');
const imageLink = document.querySelector('.popup__image');

const cardList = document.querySelector('.elements__container');

const formElement = document.querySelector('.form_type_edit');
const newCardElement = document.querySelector('.form_type_add');

function createFirstCards() {
    const showCards = initialCards.map(item => {
        const card = new Card (item, '.default-card');
        return card.generateCard();
    });
    cardList.append(...showCards);
}

function openPopUp(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('click', clickOutside);
    document.addEventListener('keydown', escapePopup);
}

function closePopUp(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('click', clickOutside);
    document.removeEventListener('keydown', escapePopup);
}

function clickOutside(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopUp(evt.target);
    }
}

function escapePopup(evt) {
    if (evt.key === "Escape") {
    const popUpActive = document.querySelector('.popup_opened');    
        closePopUp(popUpActive);
    }
}

export function showPreviewPicture(name, link) {
    imageTitle.textContent = name;
    imageLink.src = link;
    imageLink.alt = name;
    openPopUp(popupImage);
}

function openEditProfilePopup() {
    nameInput.value = nameOnProfile.textContent;
    profInput.value = profOnProfile.textContent;
    openPopUp(popupEditProfile);
}

function showCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardName = cardNameInput.value;
    const newCardLink = cardLinkInput.value;
    const newCard = createCard({ name: newCardName, link: newCardLink});
    cardList.prepend(newCard);
    closePopUp(popupAddCard);
}

function showProfileFormSubmit(evt) {
    evt.preventDefault();
    nameOnProfile.textContent = nameInput.value;
    profOnProfile.textContent = profInput.value;
    closePopUp(popupEditProfile);
}

editButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', () => {
    newCardElement.reset()
    openPopUp(popupAddCard)
});


closeButtons.forEach(function(item){
    item.addEventListener('click', function closePopUp(evt) {
        const popUpToClose = evt.target.closest('.popup');
        popUpToClose.classList.remove('popup_opened');
    });
});

formElement.addEventListener('submit', showProfileFormSubmit);
newCardElement.addEventListener('submit', showCardFormSubmit);

createFirstCards();
