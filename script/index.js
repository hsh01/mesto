let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let closeButton = document.querySelector('.popup__close');
let saveButton = document.querySelector('.popup__form-submit')

function formEdit() {
    popup.classList.remove('popup_hidden');
    formName.value = title.textContent
    formWork.value = subtitle.textContent
}

function close() {
    popup.classList.add('popup_hidden');
}

function save() {
    title.textContent = formName.value
    subtitle.textContent = formWork.value
    close();
}


editButton.addEventListener('click', formEdit);
closeButton.addEventListener('click', close);