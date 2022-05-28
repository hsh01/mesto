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
            const validator = new FormValidator(formElement, config)
            const formName = formElement.getAttribute('name')
            formValidators[formName] = validator;
            validator.enableValidation();
        });
    }

    function createCard(item) {
        const card = new Card(
            item,
            '.place-template',
            (name, link) => popupWithImage.open(name, link));
        const cardElement = card.generateCard();
        placeList.addItem(cardElement);
    }

    function setUserInfoInputs(inputData) {
        userInfoInputSelectors.profile_name.value = inputData.profile_name;
        userInfoInputSelectors.profile_job.value = inputData.profile_job;
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
        ({place_name: title, place_link: link}) => createCard({title, link}));

    addCardForm.setEventListeners();
    placeAddButton.addEventListener('click',
        () => {
            formValidators['add_place'].resetValidation();
            addCardForm.open();
        });

    enableValidation(formConfig);
})();
