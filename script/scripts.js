const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.button_type_close');
const addButton = document.querySelector('.profile__add-button-image');

const popUpEdit = document.querySelector('.popup_type_edit');
const popUpAdd = document.querySelector('.popup_type_add');
const popUpOpen = document.querySelector('.popup_type_image');

const nameOnProfile = document.querySelector('.profile__title');
const profOnProfile = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.form__item_type_name');
const profInput = document.querySelector('.form__item_type_job');
const cardNameInput = document.querySelector('.form__item_type_card-name');
const cardLinkInput = document.querySelector('.form__item_type_card-link');

const imageTitle = document.querySelector('.popup__image-title');
const imageLink = document.querySelector('.popup__image');

const cardTemplate = document.querySelector('#card_template');
const cardList = document.querySelector('.elements__container');

const formElement = document.querySelector('.form_type_edit');
const newCardElement = document.querySelector('.form_type_add');

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

function showFirstCards (item) {
    const newCard = cardTemplate.content.cloneNode(true);
    const cardName = newCard.querySelector('.element__text');
    cardName.textContent = item.name;
    const cardLink = newCard.querySelector('.element__image');
    cardName.textContent = name;
    cardLink.src = item.link;
    cardLink.alt = item.name;

    newCard.querySelector('.element__like').addEventListener('click', (evt) => {evt.target.classList.toggle('.button_clicked');});

    newCard.querySelector(".element__delete").addEventListener('click', (evt) => {
        evt.target.closest('.element').remove();
      });

    cardLink.addEventListener('click', PreviewPicture);
    return newCard
}

function PreviewPicture(evt) {
    const clickForOpen = evt.target.closest('.element');
    const openImageName = clickForOpen.querySelector('.element__text').textContent;
    const openImageLink = clickForOpen.querySelector('.element__image').src;
    imageLink.src = openImageLink;
    imageLink.alt = openImageName;
    openPopUp(popUpOpen);
}

function openPopUp(popup) {
    popup.classList.add('.popup_opened')
}

function closePopUp(popup) {
    popup.classList.remove('popup_opened');
}

function editPopUp() {
    nameInput.value = nameOnProfile.textContent;
    profInput.value = profOnProfile.textContent;
    openPopUp(popUpEdit);
}

function CardFormSubmit(evt) {
    evt.preventDefault();
    const newCardName = cardNameInput.value;
    const newCardLink = cardLinkInput.value;
    const newCard = composeItem({ name: newCardName, link: newCardLink});
    cardList.prepend(newCard);
    closePopUp(popUpAdd);
}

function ProfileFormSubmit(evt) {
    evt.preventDefault();
    nameOnProfile.textContent = nameInput.value;
    profOnProfile.textContent = profInput.value;
    closePopUp(popUpEdit);
}

editButton.addEventListener('click', editPopUp);
addButton.addEventListener('click', () => openPopUp(popUpAdd));

closeButton.forEach(function(item){
    item.addEventListener('click', function closePopUp(evt) {
        const popUpToClose = evt.target.closest('.popup');
        popUpToClose.classList.remove('popup_opened');
    });
});

formElement.addEventListener('submit', ProfileFormSubmit);
newCardElement.addEventListener('submit', CardFormSubmit);


createFirstCards();
