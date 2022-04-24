let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-input[name=name]');
let jobInput = document.querySelector('.popup__form-input[name=job]');

function formEdit() {
    popup.classList.add('popup_opened');
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}

function close() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    close();
}

editButton.addEventListener('click', formEdit);
closeButton.addEventListener('click', close);
formElement.addEventListener('submit', formSubmitHandler);