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

const formConfig = {
    fieldSelector: '.form__field',
    inputSelector: '.form__input',
    placeholderSelector: '.form__placeholder',
    inputErrorSelector: '.form__input-error',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active',
    freezePlaceholderClass: 'form__placeholder_is-fixed'
};

const formValidators = {};
const placeContainer = document.querySelector('.places');

const imageFullscreenPopup = document.querySelector('.popup_fullscreen');
const fullscreenImageElement = imageFullscreenPopup.querySelector('.popup__img');
const fullscreenCaptionElement = imageFullscreenPopup.querySelector('.popup__img-caption');


const handlePopupEscapePress = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
};

const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handlePopupEscapePress);
};

const closePopup = (popupElement) => {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', handlePopupEscapePress);
};

const openEditProfileForm = () => {
    formValidators['edit_profile'].resetValidation();
    openPopup(profileEditPopup);
};

const openAddPlaceForm = () => {
    formValidators['add_place'].resetValidation();
    openPopup(placeAddPopup);
};

const handleSubmitEditProfile = (event) => {
    event.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    closePopup(profileEditPopup);
};

const handleCardClick = (name, link) => {
    fullscreenImageElement.src = link;
    fullscreenImageElement.alt = name;
    fullscreenCaptionElement.textContent = name;
    openPopup(imageFullscreenPopup);
};

const createCard = (item) => {
    const card = new Card(item, '.place-template', handleCardClick);
    return card.generateCard();
};

const handleSubmitAddPlace = (event) => {
    event.preventDefault();
    placeContainer.prepend(createCard({
        name: placeNameInput.value,
        link: placeLinkInput.value
    }));
    closePopup(placeAddPopup);
    placeForm.reset();
};

const renderElements = () => {
    placeContainer.innerHTML = '';
    cards.forEach((item) => {
        placeContainer.append(createCard(item));
    });
};

const enableValidation = (config) => {
    const formList = Array.from(document.forms);
    formList.forEach((formElement) => {
        const validator = new FormValidator(formElement, config)
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};


(() => {
    renderElements();
    const popups = document.querySelectorAll('.popup')

    popups.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')
                || evt.target.classList.contains('popup__close')) {
                closePopup(popup);
            }
        })
    });

    profileEditButton.addEventListener('click', openEditProfileForm);
    placeAddButton.addEventListener('click', openAddPlaceForm);
    profileForm.addEventListener('submit', handleSubmitEditProfile);
    placeForm.addEventListener('submit', handleSubmitAddPlace);
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    enableValidation(formConfig);
})();
