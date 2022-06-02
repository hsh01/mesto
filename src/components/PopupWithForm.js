import Popup from "./Popup.js";


class PopupWithForm extends Popup {

    constructor(formSelector, callbackSubmitForm) {
        super(formSelector);
        this._form = this._element.querySelector('.form');
        this._callbackSubmitForm = callbackSubmitForm;
    }

    close() {
        super.close();
        this._form.reset()
    }

    _getInputValues() {
        const result = {};
        Array.from(this._form.querySelectorAll('.form__input'))
            .forEach(({name, value}) => {
                result[name] = value;
            });
        return result;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm(this._getInputValues());
            this.close();
        });
    }
}

export default PopupWithForm;