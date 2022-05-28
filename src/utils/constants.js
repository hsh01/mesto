export const userInfoSelectors = {
    nameSelector: '.profile__title',
    jobSelector: '.profile__subtitle',
}

export const userInfoInputSelectors = {
    profile_name: document.querySelector('input[name=profile_name]'),
    profile_job: document.querySelector('input[name=profile_job]'),
}


export const profileEditButton = document.querySelector('.profile__edit-button');
export const placeAddButton = document.querySelector('.profile__add-button');


export const formConfig = {
    fieldSelector: '.form__field',
    inputSelector: '.form__input',
    placeholderSelector: '.form__placeholder',
    inputErrorSelector: '.form__input-error',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active',
    freezePlaceholderClass: 'form__placeholder_is-fixed'
};

export const initialPlaces = [
    {
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