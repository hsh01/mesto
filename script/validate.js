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

const freezePlaceholder = (formElement, inputElement, freezePlaceholderClass) => {
    const placeholderElement = formElement.querySelector(`.${inputElement.name}-input-placeholder`);
    placeholderElement.classList.add(freezePlaceholderClass);
};

const unfreezePlaceholder = (formElement, inputElement, freezePlaceholderClass) => {
    const placeholderElement = formElement.querySelector(`.${inputElement.name}-input-placeholder`);
    placeholderElement.classList.remove(freezePlaceholderClass);
};

const isEmpty = (formElement, inputElement, freezePlaceholderClass) => {
    !inputElement.value.length >= 1 ? unfreezePlaceholder(formElement, inputElement, freezePlaceholderClass) :
        freezePlaceholder(formElement, inputElement, freezePlaceholderClass);
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, freezePlaceholderClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
        isEmpty(formElement, inputElement, freezePlaceholderClass);
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            isEmpty(formElement, inputElement, freezePlaceholderClass)
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

const togglePlaceholderState = (formElement, inputSelector, freezePlaceholderClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
        isEmpty(formElement, inputElement, freezePlaceholderClass);
    });
}

const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, selectors.inputSelector, selectors.submitButtonSelector,
            selectors.inactiveButtonClass, selectors.inputErrorClass, selectors.errorClass, selectors.freezePlaceholderClass);
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