const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const setEventListeners = (formElement, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit');

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });

    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
        if (formElement.name === profileForm.name) {
            nameElement.textContent = nameInput.value;
            jobElement.textContent = jobInput.value;
        }
        if (formElement.name === placeForm.name) {
            renderCard({
                name: placeNameInput.value,
                link: placeLinkInput.value
            });
        }
        closePopup(formElement.closest('.popup'));
        formElement.reset();
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

const isEmpty = (formElement, inputElement, freezePlaceholderClass) => {
    !inputElement.value.length >= 1 ? unfreezePlaceholder(formElement, inputElement, freezePlaceholderClass) :
        freezePlaceholder(formElement, inputElement, freezePlaceholderClass);
};

const freezePlaceholder = (formElement, inputElement, freezePlaceholderClass) => {
    const placeholderElement = formElement.querySelector(`.${inputElement.name}-input-placeholder`);
    placeholderElement.classList.add(freezePlaceholderClass);
};

const unfreezePlaceholder = (formElement, inputElement, freezePlaceholderClass) => {
    const placeholderElement = formElement.querySelector(`.${inputElement.name}-input-placeholder`);
    placeholderElement.classList.remove(freezePlaceholderClass);
};

const setCustomPlaceholders = (formElement, inputSelector, freezePlaceholderClass) => {
    const getInputList = Array.from(formElement.querySelectorAll(inputSelector));
    getInputList.forEach((inputElement) => {
        isEmpty(formElement, inputElement, freezePlaceholderClass);
        inputElement.addEventListener('input', () => isEmpty(formElement, inputElement, freezePlaceholderClass));
    });
};

const updateFormInputStates = (formElement, inputSelector, freezePlaceholderClass, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector('.form__submit');
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        if (inputElement.value)
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        isEmpty(formElement, inputElement, freezePlaceholderClass);
        inputElement.addEventListener('input', () => isEmpty(formElement, inputElement, freezePlaceholderClass));
    });
};

const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        setCustomPlaceholders(formElement, selectors.inputSelector, selectors.freezePlaceholderClass);
        setEventListeners(formElement, selectors.inactiveButtonClass, selectors.inputErrorClass, selectors.errorClass);
    });
};

const selectors = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active',
    freezePlaceholderClass: 'form__placeholder_is-fixed'
};

enableValidation(selectors);