let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');

let popupEdit = document.querySelector('#popup__edit-profile');
let popupAdd = document.querySelector('#popup__add-place');
let popupFullscreen = document.querySelector('.popup__place-fullscreen');

let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');

let profileForm = document.querySelector('#popup__edit-profile .popup__form');
let placeForm = document.querySelector('#popup__add-place .popup__form');

let nameInput = document.querySelector('.popup__form-input[name=name]');
let jobInput = document.querySelector('.popup__form-input[name=job]');

let placeNameInput = document.querySelector('.popup__form-input_add_place-name[name=place-name]');
let placeLinkInput = document.querySelector('.popup__form-input_add_place-link[name=place-link]');
let imgPlace = document.querySelector('.popup__img');


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


function remove_place_listener(el) {
    el.addEventListener('click', function(evt) {
        evt.target.parentElement.remove();
    });
}

function place_fullscreen(evt) {
    openPopup(popupFullscreen);
    const fullscreenImage = popupFullscreen.querySelector('.popup__img');
    fullscreenImage.src = evt.target.src;
    fullscreenImage.alt = evt.target.alt;
    popupFullscreen.querySelector('.popup__img-caption').textContent = evt.target.alt
}


function add_place(element) {
    const placeElement = placeTemplate.cloneNode(true);
    placeElement.querySelector('.place__title').textContent = element.name;
    placeElement.querySelector('.place__image').src = element.link;
    placeElement.querySelector('.place__image').alt = element.name;
    const remove_button = placeElement.querySelector('.place__remove');
    remove_button.addEventListener('click', (evt) => evt.target.parentElement.remove());
    placeElement.querySelector('.place__image').addEventListener('click', (evt) => place_fullscreen(evt));
    places.prepend(placeElement);
}

initialCards.reverse().forEach(add_place);


function placeSubmitHandler(evt) {
    evt.preventDefault();
    if (placeNameInput.value && placeLinkInput.value)
        add_place({
            name: placeNameInput.value,
            link: placeLinkInput.value
        });
    close(evt);
}

placeForm.addEventListener('submit', placeSubmitHandler);

let likes = document.querySelectorAll('.place__like');

function liked(event) {
    let like = document.getElementById(event.target.id);
    like.classList.toggle('place__like_active');
}

for (let i = 0; i < likes.length; i++) {
    likes[i].setAttribute('id', 'like-' + (i + 1));
    likes[i].addEventListener('click', liked, false);
}