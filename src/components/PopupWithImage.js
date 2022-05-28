import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(containerSelector) {
        super(containerSelector);
        this._imageElement = this._element.querySelector('.popup__img');
        this._imageCaptionElement = this._element.querySelector('.popup__img-caption');
    }

    open(name, link) {
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._imageCaptionElement.textContent = name;

        super.open();
    }
}

export default PopupWithImage;