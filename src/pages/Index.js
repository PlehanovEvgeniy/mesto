import "./index.css";
import {Card} from '../components/Card.js';
import {FormValidator, validationConfig} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithSubmit} from '../components/PopupWithSubmit.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../api/Api.js';

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-20', 'c0ebb0ed-e6f7-4466-b18b-32ea730e34e3');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');

const formElement = document.querySelector('.form_type_edit');
const newCardElement = document.querySelector('.form_type_add');
const avatarFormElement = document.querySelector('.form_avatar-image');

const profileValidator = new FormValidator(validationConfig, formElement);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, newCardElement);
addCardValidator.enableValidation();

const avatarCardValidator = new FormValidator(validationConfig, avatarFormElement);
avatarCardValidator.enableValidation();

const popupImage = new PopupWithImage('.popup_type_image', '.popup__image-title', '.popup__image');
popupImage.setEventListeners();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

api.getProfile()
    .then ((data) => {
        userInfo.setUserInfo(data)
    })
    .catch((err) => {console.log(err)}); 

const createCard = (data) => {
    const card = new Card ({
        data,
        handleInit: (card) => {
            if (card.isTurnLike(userInfo.id)) {
                card.toggleLike(true);
            }

            if (!card.isOwner(userInfo.id)) {
                card.removeButtonDelete();
            }
        },
        handleCardClick: (name, link) => {
            //...что должно произойти при клике на картинку
            popupImage.open(name, link);
        },
        handleLikeClick: (card) => {
            //...что должно произойти при клике на лайк
            if (card.isTurnLike(userInfo.id)) {
                api.takeLike(card._id)
                    .then((data) => {
                        card.setLikes(data.likes);
                        card.toggleLike(false);
                    })
                .catch((err) => {console.log(err)});
            } else {
                api.putLike(card._id)
                    .then((data) => {
                        card.setLikes(data.likes);
                        card.toggleLike(true);
                    })
                    .catch((err) => {console.log(err)});
            }
        },
        handleDeleteIconClick: (card) => {
            //...что должно произойти при клике на удаление
            const popupDeleteForm = new PopupWithSubmit('.popup_delete-card', () => {
                popupDeleteForm.renderLoading(true);
                api.deleteCard(card._id)
                    .then(() => card.removeElement())
                    .catch((err) => {console.log(err)})
                    .finally(() => {
                        popupDeleteForm.renderLoading(false);
                        popupDeleteForm.close();
                    });    
            });

            popupDeleteForm.setEventListeners();
            popupDeleteForm.open();
        }
    },'.default-card');

    card.init();
    return card.getElement();
}

const cardList = new Section('.elements__container');

api.getCards()
    .then((data) => {
        data.forEach(item => {
            cardList.addItem(createCard(item))
        })
    })
    .catch((err) => {console.log(err)});

const popupCardForm = new PopupWithForm('.popup_type_add', (item) => {
    popupCardForm.renderLoading(true);
    api.createCard(item.name, item.link)
        .then ((data) => {
            cardList.preAddItem(createCard(data));
        })
        .catch((err) => {console.log(err)})
        .finally(() => {
            popupCardForm.renderLoading(false);
            popupCardForm.close();
        }); 
});
popupCardForm.setEventListeners();

addButton.addEventListener('click', () => {
    addCardValidator.resetValidation()
    popupCardForm.open();    
})


const popupEditForm = new PopupWithForm('.popup_type_edit', (item) => {
    popupAvatarForm.renderLoading(true);
    api.saveProfile(item.name, item.prof)
        .then((data) => {
            userInfo.setUserInfo(data);
        })
        .catch((err) => {console.log(err)})
        .finally(() => {
            popupEditForm.renderLoading(false);
            popupEditForm.close(); 
        });  
})
popupEditForm.setEventListeners();

editButton.addEventListener('click', () => {
    profileValidator.resetValidation()    
    popupEditForm.open();
})


const popupAvatarForm = new PopupWithForm('.popup_avatar-image', (item) => {
    popupAvatarForm.renderLoading(true);
    api.saveProfileAvatar(item.avatar)
        .then(() => userInfo.updateAvatar(item.avatar))
        .catch((err) => {console.log(err)})
        .finally(() => {
            popupAvatarForm.renderLoading(false);
            popupAvatarForm.close();   
        });
});
popupAvatarForm.setEventListeners();

avatarButton.addEventListener('click', () => {
    avatarCardValidator.resetValidation()    
    popupAvatarForm.open();
});

