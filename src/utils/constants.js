export const userInfoSelectors = {
    nameSelector: '.profile__title',
    aboutSelector: '.profile__subtitle',
    avatarSelector: '.profile__avatar',
};

export const userInfoInputSelectors = {
    name: document.querySelector('input[name=name]'),
    about: document.querySelector('input[name=about]'),
    avatar: document.querySelector('input[name=avatar]'),
};


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

export const removeCardInputSelector = document.forms['remove_place'].querySelector(formConfig.inputSelector);

export const profileEditButton = document.querySelector('.profile__edit-button');
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
export const placeAddButton = document.querySelector('.profile__add-button');
export const profileSubmitButton = document.forms['edit_profile'].querySelector(formConfig.submitButtonSelector);
export const avatarSubmitButton = document.forms['edit_avatar'].querySelector(formConfig.submitButtonSelector);
export const placeSubmitButton = document.forms['add_place'].querySelector(formConfig.submitButtonSelector);

export const options = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
        authorization: 'ee3c68b6-7017-4762-961e-ee4790069930',
        'Content-Type': 'application/json'
    }
};