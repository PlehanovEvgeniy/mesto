let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let Name = document.getElementById('name');
let Prof = document.getElementById('prof');

let popupName = document.getElementById('popup-name');
let popupProf = document.getElementById('popup-prof');
let popupContainer = document.querySelector('.popup__container');

function openPopup() {
    popupName.setAttribute('value', Name.textContent);
    popupProf.setAttribute('value', Prof.textContent);
    popup.classList.add('popup__open');
}

function closePopup() {
    popup.classList.remove ('popup__open');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function popupSubmitHandler(evt) {
    evt.preventDefault();
    let nameValue = document.getElementById('popup-name').value;
    let profValue = document.getElementById('popup-prof').value;
    Name.textContent = nameValue;
    Prof.textContent = profValue;

    closePopup();
    popupName.setAttribute('value', name.textContent);
    popupProf.setAttribute('value', prof.textContent);
}

popupContainer.addEventListener('submit', popupSubmitHandler);