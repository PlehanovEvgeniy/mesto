const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');

const name = document.getElementById('name');
const prof = document.getElementById('prof');
 
const popupName = document.getElementById('popup-name');
const popupProf = document.getElementById('popup-prof');
const popupContainer = document.querySelector('.popup__container');
 
const cardTemplate = document.querySelector('#card_template');
const cardList = document.querySelector('.elements__container');

function openPopup() {
    popupName.value = name.textContent;
    popupProf.value = prof.textContent;
    popup.classList.add('popup_open');
} 

function closePopup() {
    popup.classList.remove ('popup_open');
}
 
function popupSubmitHandler(evt) {
    evt.preventDefault();

    name.textContent = popupName.value;
    prof.textContent = popupProf.value;    
    closePopup();
} 
 
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', popupSubmitHandler);


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createFirstCards() {
    const showCards = initialCards.map(showFirstCards);
    cardList.append(...showCards);
}
createFirstCards();

function showFirstCards ({ name, link }) {
    const newCard = cardTemplate.content.cloneNode(true);
    const cardName = newCard.querySelector('.element__text');
    const cardLink = newCard.querySelector('.element__image');
    cardName.textContent = name;
    cardLink.src = link;
    cardLink.alt = name;
    return newCard
}
