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
        }
    }
}

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

const profileEditSubmitHandler = (event) => {
    event.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    closePopup(profileEditPopup);
};

const placeAddSubmitHandler = (event) => {
    event.preventDefault();
    renderCard({
        name: placeNameInput.value,
        link: placeLinkInput.value
    });
    closePopup(placeAddPopup);
    placeForm.reset();
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

const init = () => {
    buttonCloseList.forEach(setCloseButtonHandler);
    profileEditButton.addEventListener('click', openEditProfileForm);
    placeEditButton.addEventListener('click', openAddPlaceForm);
    profileForm.addEventListener('submit', profileEditSubmitHandler);
    placeForm.addEventListener('submit', placeAddSubmitHandler);
    initialCards.reverse().forEach(renderCard);
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    togglePlaceholderState(profileForm, selectors.inputSelector, selectors.freezePlaceholderClass);
};

init();
