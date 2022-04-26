const btnEdt = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('#popup__edit-profile');
const popupAdd = document.querySelector('#popup__add-place');
const popupFullscreen = document.querySelector('.popup_fullscreen');
const fullscreenImage = popupFullscreen.querySelector('.popup__img');
const fullscreenCaption = popupFullscreen.querySelector('.popup__img-caption');

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

const profileForm = document.querySelector('#popup__edit-profile .popup__form');
const placeForm = document.querySelector('#popup__add-place .popup__form');

const nameInput = document.querySelector('.popup__form-input[name=name]');
const jobInput = document.querySelector('.popup__form-input[name=job]');

const placeNameInput = document.querySelector('.popup__form-input_add_place-name[name=place-name]');
const placeLinkInput = document.querySelector('.popup__form-input_add_place-link[name=place-link]');


const btnCloseList = document.querySelectorAll('.popup__close');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

function formEdit() {
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
    openPopup(popupEdit);
}

function close(evt) {
    evt.target.parentElement.parentElement.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    closePopup(evt.target.closest('.popup'));
    profileForm.reset();
}

btnEdt.addEventListener('click', formEdit);
btnAdd.addEventListener('click', function() {
    openPopup(popupAdd);
});
profileForm.addEventListener('submit', formSubmitHandler);
btnCloseList.forEach(el => el.addEventListener('click', close));

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

const placeContainer = document.querySelector('.places');
const placeTemplate = document.querySelector('.place-template').content;


function remove_place_listener(el) {
    el.addEventListener('click', function(evt) {
        evt.target.parentElement.remove();
    });
}

function handleCardImageClick(element) {
    fullscreenImage.src = element.src;
    fullscreenImage.alt = element.alt;
    fullscreenCaption.textContent = element.alt;
    openPopup(popupFullscreen);
}

function handleCardLikeClick(element) {
    element.classList.toggle('place__like_active');
}

function createCard(element) {
    const placeElement = placeTemplate.cloneNode(true);
    const cardImage = placeElement.querySelector('.place__image');
    const cardLike = placeElement.querySelector('.place__like');
    placeElement.querySelector('.place__title').textContent = element.name;
    cardImage.src = element.link;
    cardImage.alt = element.name;
    const btnRemove = placeElement.querySelector('.place__remove');
    btnRemove.addEventListener('click', (evt) => evt.target.closest('.place').remove());
    cardImage.addEventListener('click', (evt) => handleCardImageClick(evt.target));
    cardLike.addEventListener('click', (evt) => handleCardLikeClick(evt.target));
    return placeElement;
}

function renderCard(element) {
    placeContainer.prepend(createCard(element));
}

function placeSubmitHandler(evt) {
    evt.preventDefault();
    renderCard({
        name: placeNameInput.value,
        link: placeLinkInput.value
    });
    closePopup(evt.target.closest('.popup'));
    placeForm.reset();
}

placeForm.addEventListener('submit', placeSubmitHandler);

initialCards.reverse().forEach(renderCard);