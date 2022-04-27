const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit');

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });

    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
        if (formElement.name === 'edit_profile') {
            nameElement.textContent = nameInput.value;
            jobElement.textContent = jobInput.value;
        }
        if (formElement.name === 'add_place') {
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

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('form__submit_disabled');
    } else {
        buttonElement.classList.remove('form__submit_disabled');
    }
}

const setToggleButtonState = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit');
    toggleButtonState(inputList, buttonElement);
};

const isEmpty = (formElement, inputElement) => {
    !inputElement.value.length >= 1 ? unfreezePlaceholder(formElement, inputElement) :
        freezePlaceholder(formElement, inputElement);
};

const freezePlaceholder = (formElement, inputElement) => {
    const placeholderElement = formElement.querySelector(`.${inputElement.name}-input-placeholder`);
    placeholderElement.classList.add('form__placeholder_is-fixed');
};

const unfreezePlaceholder = (formElement, inputElement) => {
    const placeholderElement = formElement.querySelector(`.${inputElement.name}-input-placeholder`);
    placeholderElement.classList.remove('form__placeholder_is-fixed');
};

const setCustomPlaceholders = (formElement) => {
    const getInputList = Array.from(formElement.querySelectorAll(`.form__input`));
    getInputList.forEach((inputElement) => {
        isEmpty(formElement, inputElement);
        inputElement.addEventListener('input', () => isEmpty(formElement, inputElement));
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        setCustomPlaceholders(formElement);
        setEventListeners(formElement);
    });
};

enableValidation();