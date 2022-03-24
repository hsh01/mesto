//likes
let likes = document.querySelectorAll('.place__like');

function liked(event) {
    let like = document.getElementById(event.target.id);
    like.classList.toggle('place__like_active');
}

for (let i = 0; i < likes.length; i++) {
    likes[i].setAttribute('id', 'like-' + (i + 1));
    likes[i].addEventListener('click', liked, false);
}

//edit
let editButton = document.querySelector('.profile__edit-button');
let form = document.querySelector('.form');
let page = document.querySelector('.page')

function formEdit() {
    form.classList.remove('hidden');
    page.classList.add('overlay');
    document.querySelector('.input__text_type_name').value = document.querySelector('.profile__title').textContent
    document.querySelector('.input__text_type_work').value = document.querySelector('.profile__subtitle').textContent
}

editButton.addEventListener('click', formEdit);

//close
let closeButton = document.querySelector('.form__close');
let saveButton = document.querySelector('.form__save-btn');

function close() {
    document.querySelector('.profile__title').textContent = document.querySelector('.input__text_type_name').value
    document.querySelector('.profile__subtitle').textContent = document.querySelector('.input__text_type_work').value
    form.classList.add('hidden');
    page.classList.remove('overlay');
}

closeButton.addEventListener('click', close);
saveButton.addEventListener('click', close);