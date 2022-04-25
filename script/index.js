let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let popupAdd = document.querySelector('.popup_add_new-place');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-input[name=name]');
let jobInput = document.querySelector('.popup__form-input[name=job]');
let placeNameInput = document.querySelector('.popup__form-input_add_place-name[name=place-name]');
let placeLinkInput = document.querySelector('.popup__form-input_add_place-link[name=place-link]');
let imgPlace = document.querySelector('.popup__img');


function formEdit() {
    popup.classList.add('popup_opened');
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}

function close() {
    popup.classList.remove('popup_opened');
}

function formAddEdit() {
  popupAdd.classList.add('popup_opened');
  placeNameInput.value = title.textContent;
  placeLinkInput.value = subtitle.textContent;
}

function close() {
  popupAdd.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    close();
}

editButton.addEventListener('click', formEdit);
addButton.addEventListener('click', formAddEdit);
closeButton.addEventListener('click', close);
formElement.addEventListener('submit', formSubmitHandler);

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

const places = document.querySelector('.places');
const placeTemplate = document.querySelector('.place-template').content;


function add_place(element) {
    const placeElement = placeTemplate.cloneNode(true);
    placeElement.querySelector('.place__title').textContent = element.name;
    placeElement.querySelector('.place__image').src = element.link;
    places.append(placeElement);
}

initialCards.forEach(add_place);

let placeInput = document.querySelector('.popup__form-input[name=name]');
let placeLinkInput = document.querySelector('.popup__form-input[name=job]');

function PlaceSubmitHandler(evt) {
    evt.preventDefault();
    initialCards.unshift({
        name: placeInput.value,
        link: placeLinkInput.value
    });
    places.replaceChildren();
    initialCards.forEach(add_place);
    close();
}

formElement.addEventListener('submit', PlaceSubmitHandler);
