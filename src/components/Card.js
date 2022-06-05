import notFoundImage from '../images/image.png';

class Card {

    constructor({_id, name, link, owner, likes}, userId, templateSelector, handleCardClick,
                handleLikeClick, handleRemoveClick) {
        this._id = _id;
        this._userId = userId;
        this._isOwner = owner._id === this._userId;
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleImageClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleRemoveClick = handleRemoveClick;

        this._element = this._getTemplate();
        this._titleElement = this._element.querySelector('.place__title');
        this._cardImage = this._element.querySelector('.place__image');
        this._likeElement = this._element.querySelector('.place__like');
        this._likeCounterElement = this._element.querySelector('.place__like-counter');
        this._trashElement = this._element.querySelector('.place__remove');
        this.setLike(likes);
    }

    getId() {
        return this._id;
    }

    getIsLiked() {
        return this._isLiked;
    }

    setLike(likes) {
        this._likeCount = likes.length;
        this._likeCounterElement.textContent = this._likeCount;
        this._isLiked = likes.some(({_id}) => _id === this._userId);
        if (this._isLiked) {
            this._likeElement.classList.add('place__like_active');
        } else {
            this._likeElement.classList.remove('place__like_active');
        }
    }

    _getTemplate() {
        this._template = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);
            if (this._isOwner) {
                const templateButton = document.createElement('template');
                templateButton.innerHTML = '<button class="place__remove" type="button" aria-label="удалить"></button>';
                this._template.append(templateButton.content.cloneNode(true));
            }
            this._template.id = this._id;
        return this._template;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => this._handleImageClick({name: this._name, link: this._link}));
        this._likeElement.addEventListener('click', () => this._handleLikeClick());
        if (this._isOwner) {
            this._trashElement.addEventListener('click', () => this._handleRemoveClick());
        }
    }

    generateCard() {
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._cardImage.onerror = () => {
            this._cardImage.onerror=null;
            this._link = notFoundImage;
            this._name += ' не найдено.';
            this._cardImage.src = this._link;
            this._cardImage.alt = this._name;
        };

        this._titleElement.textContent = this._name;
        this._likeCounterElement.textContent = this._likeCount;
        this._setEventListeners();

        return this._element;
    }
}

export default Card;