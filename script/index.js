let editButton = document.querySelector('.profile__edit-button');
let form = document.querySelector('.popup');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');

function formEdit() {
    form.classList.remove('hidden');
    formName.value = title.textContent
    formWork.value = subtitle.textContent
}

editButton.addEventListener('click', formEdit);

let closeButton = document.querySelector('.popup__close');

function close() {
    form.classList.add('hidden');
}

function save() {
    title.textContent = formName.value
    subtitle.textContent = formWork.value
    close();
}

closeButton.addEventListener('click', close);