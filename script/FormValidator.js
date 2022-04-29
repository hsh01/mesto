export default class FormValidator {
    constructor(selectors, form) {
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;
        this._freezePlaceholderClass = selectors.freezePlaceholderClass;
        this._form = form;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.name}-input-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.name}-input-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    _freezePlaceholder(inputElement) {
        const placeholderElement = this._form.querySelector(`.${inputElement.name}-input-placeholder`);
        placeholderElement.classList.add(this._freezePlaceholderClass);
    }

    _unfreezePlaceholder(inputElement) {
        const placeholderElement = this._form.querySelector(`.${inputElement.name}-input-placeholder`);
        placeholderElement.classList.remove(this._freezePlaceholderClass);
    }

    _isEmpty(inputElement) {
        !inputElement.value.length >= 1 ? this._unfreezePlaceholder(inputElement) :
            this._freezePlaceholder(inputElement);
    }

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        const buttonElement = this._form.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            this._isEmpty(inputElement);
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._isEmpty(inputElement)
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    _togglePlaceholderState() {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        inputList.forEach((inputElement) => {
            this._isEmpty(inputElement);
        });
    }

    enableValidation() {
        this._setEventListeners();
        this._togglePlaceholderState();
    }
}
