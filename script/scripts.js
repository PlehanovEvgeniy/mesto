let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

let name = document.getElementById('name');
let prof = document.getElementById('prof');
 
let popupName = document.getElementById('popup-name');
let popupProf = document.getElementById('popup-prof');
let popupContainer = document.querySelector('.popup__container');
 
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