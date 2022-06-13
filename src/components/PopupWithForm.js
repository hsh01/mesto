import Popup from "./Popup.js";


class PopupWithForm extends Popup {

    constructor(formSelector, callbackSubmitForm) {
        super(formSelector);
        this._form = this._element.querySelector('.form');
        this._inputs = this._form.querySelectorAll('.form__input');
        this._button = this._form.querySelector('.form__submit');
        this._callbackSubmitForm = callbackSubmitForm;
    }

    popupLoaderCallback(loading, loadText = 'Сохранение') {
        if (loading) {
            this._button.classList.add('form__submit_loading');
            this._button.textContent = loadText;
        } else {
            this._button.classList.remove('form__submit_loading');
        }
    }

    popupSuccessCallback(initialText = 'Сохранить', loadedText = 'Сохранено') {
        this._button.classList.add('form__submit_loading-ok');
        this._button.textContent = loadedText;
        setTimeout(() => {
            this._button.classList.remove('form__submit_loading-ok');
            this._button.textContent = initialText;
            this.close();
        }, 1000);
    }

    popupErrorCallback(err, initialText = 'Сохранить') {
        this._button.textContent = `Ошибка: ${err}.`;
        setTimeout(() => {
            this._button.textContent = initialText;
        }, 3000);
    }

    close() {
        super.close();
        this._form.reset()
    }

    _getInputValues() {
        const result = {};
        Array.from(this._inputs)
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
        });
    }
}

export default PopupWithForm;