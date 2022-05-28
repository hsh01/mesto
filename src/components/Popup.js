class Popup {
    constructor(containerSelector) {
        this._element = document.querySelector(containerSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._element.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose({key}) {
        if (key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._element.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')
                || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
    }
}

export default Popup;