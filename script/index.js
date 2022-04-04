let editButton = document.querySelector('.profile__edit-button');
let form = document.querySelector('.pop-up');
let formName = document.querySelector('.input__text_type_name');
let formWork = document.querySelector('.input__text_type_work');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');

function formEdit() {
    form.classList.remove('pop-up_hidden');
    formName.value = title.textContent
    formWork.value = subtitle.textContent
}

editButton.addEventListener('click', formEdit);

let closeButton = document.querySelector('.form__close');

function close() {
    form.classList.add('pop-up_hidden');
}

function save() {
    title.textContent = formName.value
    subtitle.textContent = formWork.value
    close();
}

closeButton.addEventListener('click', close);