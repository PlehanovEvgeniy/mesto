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

const cardTemplate = document.querySelector('#card_template');
const cardList = document.querySelector('.elements__container');

const formElement = document.querySelector('.form_type_edit');
const newCardElement = document.querySelector('.form_type_add');

function createFirstCards() {
    const showCards = initialCards.map(createCard);
    cardList.append(...showCards);
}

function createCard (item) {
    const newCard = cardTemplate.content.cloneNode(true);
    const cardName = newCard.querySelector('.element__text');
    cardName.textContent = item.name;
    const cardLink = newCard.querySelector('.element__image');
    cardLink.src = item.link;
    cardLink.alt = item.name;

    newCard.querySelector('.element__like').addEventListener('click', (evt) => {evt.target.classList.toggle('button_clicked');});

    newCard.querySelector(".element__delete").addEventListener('click', (evt) => {
        evt.target.closest('.element').remove();
      });

    cardLink.addEventListener('click', showPreviewPicture);
    return newCard
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
    const popUpActive = document.querySelector('.popup_opened');
    if (evt.key === "Escape") {
        closePopUp(popUpActive);
    }
  }

function showPreviewPicture(evt) {
    const clickForOpen = evt.target.closest('.element');
    const openImageName = clickForOpen.querySelector('.element__text').textContent;
    const openImageLink = clickForOpen.querySelector('.element__image').src;
    imageTitle.textContent = openImageName;
    imageLink.src = openImageLink;
    imageLink.alt = openImageName;
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
addButton.addEventListener('click', () => openPopUp(popupAddCard));


closeButtons.forEach(function(item){
    item.addEventListener('click', function closePopUp(evt) {
        const popUpToClose = evt.target.closest('.popup');
        popUpToClose.classList.remove('popup_opened');
    });
});


formElement.addEventListener('submit', showProfileFormSubmit);
newCardElement.addEventListener('submit', showCardFormSubmit);

createFirstCards();
