const CARD_SELECTOR = '.place';
const imageFullscreenPopup = document.querySelector('.popup_fullscreen');
const fullscreenImageElement = imageFullscreenPopup.querySelector('.popup__img');
const fullscreenCaptionElement = imageFullscreenPopup.querySelector('.popup__img-caption');
const fullscreenCloseButton = imageFullscreenPopup.querySelector('.popup_fullscreen .popup__close');


export default class Card {

    constructor(props, context) {
        this._id = props.id;
        this._name = props.name;
        this._link = props.link;
        this._cardSelector = context;
        this.isLiked = false;
    }

    _handleCardLikeClick() {
        this.isLiked = !this.isLiked;
        this._likeElement.classList.toggle('place__like_active');
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector(CARD_SELECTOR)
            .cloneNode(true);
    }

    _escapeClosePopup(evt) {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            if (openedPopup) {
                openedPopup.classList.remove('popup_opened');
            }
        }
    }

    _handleOpenPopup() {
        imageFullscreenPopup.classList.add('popup_opened');
        document.addEventListener('keydown', this._escapeClosePopup);
    }

    _handleClosePopup() {
        fullscreenImageElement.src = '';
        fullscreenImageElement.alt = '';
        fullscreenCaptionElement.textContent = '';
        imageFullscreenPopup.classList.remove('popup_opened');
    }

    _handleCardImageClick() {
        fullscreenImageElement.src = this._link;
        fullscreenImageElement.alt = this._name;
        fullscreenCaptionElement.textContent = this._name;
        this._handleOpenPopup();
    }

    _handleCardRemoveClick() {
        this._element.closest(CARD_SELECTOR).remove();
    }

    _setEventListeners() {
        this._element.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('place__image')) {
                this._handleCardImageClick();
            }
            if (evt.target.classList.contains('place__like')) {
                this._handleCardLikeClick();
            }
            if (evt.target.classList.contains('place__remove')) {
                this._handleCardRemoveClick(evt.target);
            }
        });
        fullscreenCloseButton.addEventListener('click', this._handleClosePopup);
        imageFullscreenPopup.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('popup'))
                this._handleClosePopup();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.id = this._id;
        const cardImage = this._element.querySelector('.place__image');
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._element.querySelector('.place__title').textContent = this._name;
        this._likeElement = this._element.querySelector('.place__like');

        return this._element;
    }
}