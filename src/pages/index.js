import {Card, FormValidator, PopupWithForm, PopupWithImage, Section, UserInfo} from "../components";
import {
    formConfig,
    initialPlaces,
    placeAddButton,
    profileEditButton,
    userInfoInputSelectors,
    userInfoSelectors
} from "../utils/constants.js";
import '../pages/index.css';

(() => {
    function enableValidation(config) {
        const formList = Array.from(document.forms);
        formList.forEach((formElement) => {
            const validator = new FormValidator(formElement, config);
            const formName = formElement.getAttribute('name');
            formValidators[formName] = validator;
            validator.enableValidation();
        });
    }

    function createCard(item) {
        const card = new Card(
            item,
            '.place-template',
            (item) => popupWithImage.open(item));
        const cardElement = card.generateCard();
        placeList.addItem(cardElement);
    }

    function setUserInfoInputs(inputData) {
        userInfoInputSelectors.username.value = inputData.username;
        userInfoInputSelectors.job.value = inputData.job;
    }

    const formValidators = {};
    const popupWithImage = new PopupWithImage('.popup_fullscreen');
    popupWithImage.setEventListeners();

    const placeList = new Section({
            items: initialPlaces.reverse(),
            renderer: createCard
        },
        '.places');
    placeList.renderItems();

    const userInfo = new UserInfo(userInfoSelectors);
    const profileEditForm = new PopupWithForm(
        '#popup__edit-profile',
        (inputsData) => userInfo.setUserInfo(inputsData));
    profileEditForm.setEventListeners();
    profileEditButton.addEventListener('click', () => {
        setUserInfoInputs(userInfo.getUserInfo());
        formValidators['edit_profile'].resetValidation();
        profileEditForm.open();
    });

    const addCardForm = new PopupWithForm(
        '#popup__add-place',
        item => createCard(item));

    addCardForm.setEventListeners();
    placeAddButton.addEventListener('click',
        () => {
            formValidators['add_place'].resetValidation();
            addCardForm.open();
        });

    enableValidation(formConfig);
})();
