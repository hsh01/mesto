import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {cards} from "./data.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const placeAddButton = document.querySelector('.profile__add-button');

const profileEditPopup = document.querySelector('#popup__edit-profile');
const placeAddPopup = document.querySelector('#popup__add-place');

const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

const profileForm = document.forms['edit_profile'];
const placeForm = document.forms['add_place'];

const nameInput = profileForm.elements['profile-name'];
const jobInput = profileForm.elements['profile-job'];

const placeNameInput = placeForm.elements['place-name'];
const placeLinkInput = placeForm.elements['place-link'];

const placeContainer = document.querySelector('.places');

const escapeClosePopup = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
};

const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', escapeClosePopup);
};

const closePopup = (popupElement) => {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', escapeClosePopup);
};

const openEditProfileForm = () => {
    openPopup(profileEditPopup);
};

const openAddPlaceForm = () => {
    openPopup(placeAddPopup);
};

const profileEditSubmitHandler = (event) => {
    event.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    closePopup(profileEditPopup);
};

const placeAddSubmitHandler = (event) => {
    event.preventDefault();
    const card = new Card({
        name: placeNameInput.value,
        link: placeLinkInput.value
    }, '.place-template');
    const cardElement = card.generateCard();
    placeContainer.prepend(cardElement);
    closePopup(placeAddPopup);
    placeForm.reset();
};

const setCloseButtonHandler = (button) => {
    const popupElement = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popupElement));
    popupElement.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup'))
            closePopup(popupElement);
    });
};

const renderElements = () => {
    placeContainer.innerHTML = '';
    cards.forEach((item) => {
        item.id = Date.now().toString(36) + Math.random().toString(36).substring(2);
        const card = new Card(item, '.place-template');
        const cardElement = card.generateCard();
        placeContainer.append(cardElement);
    });
};


(() => {
    renderElements();
    setCloseButtonHandler(profileEditPopup.querySelector('.popup__close'));
    setCloseButtonHandler(placeAddPopup.querySelector('.popup__close'));
    profileEditButton.addEventListener('click', openEditProfileForm);
    placeAddButton.addEventListener('click', openAddPlaceForm);
    profileForm.addEventListener('submit', profileEditSubmitHandler);
    placeForm.addEventListener('submit', placeAddSubmitHandler);
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    const selectors = {
        inputSelector: '.form__input',
        submitButtonSelector: '.form__submit',
        inactiveButtonClass: 'form__submit_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'form__input-error_active',
        freezePlaceholderClass: 'form__placeholder_is-fixed'
    };
    const profileFormValidation = new FormValidator(selectors, profileForm);
    profileFormValidation.enableValidation();
    const placeFormValidation = new FormValidator(selectors, placeForm);
    placeFormValidation.enableValidation();
})();
