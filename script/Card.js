export default class Card {

    /**
     * @param {{name, link}} data
     * @param {string} templateSelector
     * @param {function} handleCardClick
     */
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this.isLiked = false;
        this._handleImageClick = handleCardClick;

        this._element = this._getTemplate();
        this._titleElement = this._element.querySelector('.place__title');
        this._cardImage = this._element.querySelector('.place__image');
        this._likeElement = this._element.querySelector('.place__like');
        this._trashElement = this._element.querySelector('.place__remove');
    }

    _handleLikeClick() {
        this.isLiked = !this.isLiked;
        this._likeElement.classList.toggle('place__like_active');
    }

    _handleTrashClick() {
        this._element.remove();
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleImageClick(this._name, this._link);
        });
        this._likeElement.addEventListener('click', () => {
            this._handleLikeClick();
        });
        this._trashElement.addEventListener('click', () => {
            this._handleTrashClick();
        });
    }

    generateCard() {
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._titleElement.textContent = this._name;
        this._setEventListeners();

        return this._element;
    }
}