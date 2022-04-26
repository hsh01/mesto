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

const profileForm = document.querySelector('#popup__edit-profile .popup__form');
const placeForm = document.querySelector('#popup__add-place .popup__form');

const nameInput = document.querySelector('.popup__form-input[name=name]');
const jobInput = document.querySelector('.popup__form-input[name=job]');

const placeNameInput = document.querySelector('.popup__form-input_add_place-name[name=place-name]');
const placeLinkInput = document.querySelector('.popup__form-input_add_place-link[name=place-link]');


const buttonCloseList = document.querySelectorAll('.popup__close');

const placeContainer = document.querySelector('.places');
const placeTemplate = document.querySelector('.place-template').content;

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

function formEdit() {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
    openPopup(profileEditPopup);
}

function profileEditSubmitHandler(event) {
    event.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    closePopup(profileEditPopup);
    profileForm.reset();
}

function handleCardImageClick(element) {
    fullscreenImageElement.src = element.src;
    fullscreenImageElement.alt = element.alt;
    fullscreenCaptionElement.textContent = element.alt;
    openPopup(imageFullscreenPopup);
}

function handleCardLikeClick(element) {
    element.classList.toggle('place__like_active');
}

/**
 * @param {string} name Place name
 * @param {string} link Image link
 */
function createCard(name, link) {
    const placeElement = placeTemplate.cloneNode(true);
    const cardImage = placeElement.querySelector('.place__image');
    const cardLike = placeElement.querySelector('.place__like');
    placeElement.querySelector('.place__title').textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
    const btnRemove = placeElement.querySelector('.place__remove');
    btnRemove.addEventListener('click', (event) => event.target.closest('.place').remove());
    cardImage.addEventListener('click', () => handleCardImageClick(cardImage));
    cardLike.addEventListener('click', () => handleCardLikeClick(cardLike));
    return placeElement;
}

/**
 * @param {string} name Place name
 * @param {string} link Image link
 */
function renderCard(name, link) {
    placeContainer.prepend(createCard(name, link));
}

function placeAddSubmitHandler(event) {
    event.preventDefault();
    renderCard(placeNameInput.value, placeLinkInput.value);
    closePopup(placeAddPopup);
    placeForm.reset();
}

profileForm.addEventListener('submit', profileEditSubmitHandler);
placeForm.addEventListener('submit', placeAddSubmitHandler);
profileEditButton.addEventListener('click', formEdit);

placeEditButton.addEventListener('click', function() {
    openPopup(placeAddPopup);
});

buttonCloseList.forEach(button => button.addEventListener('click', (event) => closePopup(event.target.closest('.popup'))));

initialCards.reverse().forEach((element) => renderCard(element.name, element.link));