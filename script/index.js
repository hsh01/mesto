const initialCards = [{
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

const profileEditButton = document.querySelector('.profile__edit-button');
const placeEditButton = document.querySelector('.profile__add-button');

const profileEditPopup = document.querySelector('#popup__edit-profile');
const placeAddPopup = document.querySelector('#popup__add-place');
const imageFullscreenPopup = document.querySelector('.popup_fullscreen');
const fullscreenImageElement = imageFullscreenPopup.querySelector('.popup__img');
const fullscreenCaptionElement = imageFullscreenPopup.querySelector('.popup__img-caption');

const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');

const profileForm = document.forms['edit_profile'];
const placeForm = document.forms['add_place'];

const nameInput = profileForm.elements['profile-name'];
const jobInput = profileForm.elements['profile-job'];

const placeNameInput = placeForm.elements['place-name'];
const placeLinkInput = placeForm.elements['place-link'];

const buttonCloseList = document.querySelectorAll('.popup__close');

const placeContainer = document.querySelector('.places');
const placeTemplate = document.querySelector('.place-template').content;

const escapeClosePopup = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
            document.removeEventListener('keydown', escapeClosePopup);
        }
    }
}

const openPopup = (popupElement) => {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', escapeClosePopup);
};

const closePopup = (popupElement) => {
    popupElement.classList.remove('popup_opened');
};

const openEditProfileForm = () => {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    updateFormInputStates(profileForm, selectors.inputSelector, selectors.freezePlaceholderClass, selectors.inactiveButtonClass, selectors.inputErrorClass, selectors.errorClass);
    openPopup(profileEditPopup);
};

const openAddPlaceForm = () => {
    updateFormInputStates(placeForm, selectors.inputSelector, selectors.freezePlaceholderClass, selectors.inactiveButtonClass, selectors.inputErrorClass, selectors.errorClass);
    openPopup(placeAddPopup);
};

const handleCardImageClick = (element) => {
    fullscreenImageElement.src = element.link;
    fullscreenImageElement.alt = element.name;
    fullscreenCaptionElement.textContent = element.name;
    openPopup(imageFullscreenPopup);
};

const handleCardLikeClick = (element) => {
    element.classList.toggle('place__like_active');
};

const handleCardRemoveClick = (element) => {
    element.closest('.place').remove();
};

const createCard = (element) => {
    const placeElement = placeTemplate.cloneNode(true);
    const cardImage = placeElement.querySelector('.place__image');

    placeElement.querySelector('.place__title').textContent = element.name;
    cardImage.src = element.link;
    cardImage.alt = element.name;

    placeElement.firstElementChild.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('place__image')) handleCardImageClick(element);
        if (evt.target.classList.contains('place__like')) handleCardLikeClick(evt.target);
        if (evt.target.classList.contains('place__remove')) handleCardRemoveClick(evt.target);
    });
    return placeElement;
};

const renderCard = (element) => {
    placeContainer.prepend(createCard(element));
};

const setCloseButtonHandler = (button) => {
    const popupElement = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popupElement));
    popupElement.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup'))
            closePopup(popupElement);
    });
};

const initPopup = () => {
    buttonCloseList.forEach(setCloseButtonHandler);
    profileEditButton.addEventListener('click', openEditProfileForm);
    placeEditButton.addEventListener('click', openAddPlaceForm);
};

initPopup();

initialCards.reverse().forEach(renderCard);