export default class FormValidator {
    constructor(form, selectors) {
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;
        this._freezePlaceholderClass = selectors.freezePlaceholderClass;
        this._form = form;

        const fields = Array.from(this._form.querySelectorAll(selectors.fieldSelector));
        this._fieldList = [];
        fields.forEach((field) => {
            this._fieldList.push({
                input: field.querySelector(selectors.inputSelector),
                error: field.querySelector(selectors.inputErrorSelector),
                placeholder: field.querySelector(selectors.placeholderSelector)
            });
        });
        this._submitButton = this._form.querySelector(selectors.submitButtonSelector);
    }

    _showError(field) {
        field.input.classList.add(this._inputErrorClass);
        field.error.textContent = field.input.validationMessage;
        field.error.classList.add(this._errorClass);
    }

    _hideError(field) {
        field.input.classList.remove(this._inputErrorClass);
        field.error.classList.remove(this._errorClass);
        field.error.textContent = '';
    }

    _checkInputValidity(field) {
        if (!field.input.validity.valid) {
            this._showError(field);
        } else {
            this._hideError(field);
        }
    }

    _hasInvalidInput() {
        return this._fieldList.some((field) => {
            return !field.input.validity.valid;
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._fieldList)) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    _freezePlaceholder(placeholderElement) {
        placeholderElement.classList.add(this._freezePlaceholderClass);
    }

    _unfreezePlaceholder(placeholderElement) {
        placeholderElement.classList.remove(this._freezePlaceholderClass);
    }

    _isEmpty(field) {
        !field.input.value.trim().length >= 1
            ? this._unfreezePlaceholder(field.placeholder)
            : this._freezePlaceholder(field.placeholder);
    }

    _togglePlaceholderState() {
        this._fieldList.forEach((field) => {
            this._isEmpty(field);
        });
    }

    enableValidation() {
        this._fieldList.forEach((field) => {
            field.input.addEventListener('input', () => {
                this._checkInputValidity(field);
                this._isEmpty(field)
                this._toggleButtonState();
            });
        });
    }

    resetValidation() {
        this._togglePlaceholderState();
        this._toggleButtonState();
        this._fieldList.forEach((filed) => {
            this._hideError(filed);
        });
    }
}
