let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');

let popupEdit = document.querySelector('#popup__edit-profile');
let popupAdd = document.querySelector('#popup__add-place');

let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');

let profileForm = document.querySelector('#popup__edit-profile .popup__form');
let placeForm = document.querySelector('#popup__add-place .popup__form');

let nameInput = document.querySelector('.popup__form-input[name=name]');
let jobInput = document.querySelector('.popup__form-input[name=job]');

let placeNameInput = document.querySelector('.popup__form-input_add_place-name[name=place-name]');
let placeLinkInput = document.querySelector('.popup__form-input_add_place-link[name=place-link]');

let closeButtons = document.querySelectorAll('.popup__close');

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function formEdit() {
    openPopup(popupEdit);
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}

function close(evt) {
    evt.target.parentElement.parentElement.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    close(evt);
}

editButton.addEventListener('click', formEdit);
addButton.addEventListener('click', function() {
    openPopup(popupAdd);
});
profileForm.addEventListener('submit', formSubmitHandler);
closeButtons.forEach(el => el.addEventListener('click', close));

let initialCards = [{
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
    places.prepend(placeElement);
}

initialCards.reverse().forEach(add_place);

let removeButtons = document.querySelectorAll('.place__remove');

function placeSubmitHandler(evt) {
    evt.preventDefault();
    add_place({
        name: placeNameInput.value,
        link: placeLinkInput.value
    });
    close(evt);
}

placeForm.addEventListener('submit', placeSubmitHandler);

function remove_place(place) {
    place.remove();
    // initialCards = initialCards.filter(element => element.name !== place.querySelector('.place__title').textContent && element.link !== place.querySelector('.place__image').src);
    // refresh_places();
}

removeButtons.forEach(el => el.addEventListener('click', function(evt) {
    let place = evt.target.parentElement;
    remove_place(place);
}));