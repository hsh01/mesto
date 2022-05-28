import {Card, FormValidator, PopupWithForm, PopupWithImage, Section, UserInfo} from "../components";
import {
    initialPlaces,
    formConfig,
    placeAddButton,
    profileEditButton,
    userInfoInputSelectors,
    userInfoSelectors
} from "../utils/constants.js";
import '../pages/index.css';

(() => {
    const formValidators = {};

    const popupWithImage = new PopupWithImage('.popup_fullscreen');
    popupWithImage.setEventListeners();

    const enableValidation = (config) => {
        const formList = Array.from(document.forms);
        formList.forEach((formElement) => {
            const validator = new FormValidator(formElement, config)
            const formName = formElement.getAttribute('name')
            formValidators[formName] = validator;
            validator.enableValidation();
        });
    };
    const createCard = item => {
        const card = new Card(
            item,
            '.place-template',
            (name, link) => {
                popupWithImage.open(name, link);
            });
        const cardElement = card.generateCard();
        placeList.addItem(cardElement);
    };

    const placeList = new Section({
            items: initialPlaces.reverse(),
            renderer: createCard
        },
        '.places');

    placeList.renderItems();

    const userInfo = new UserInfo(userInfoSelectors);
    const editForm = new PopupWithForm(
        '[name="edit_profile"]',
        (inputs) => {
            userInfo.setUserInfo({
                name: inputs['profile-name'],
                job: inputs['profile-job']
            });
        });
    editForm.setEventListeners();
    profileEditButton.addEventListener('click', () => {
        userInfoInputSelectors.name.value = userInfo.getUserInfo()['name'];
        userInfoInputSelectors.job.value = userInfo.getUserInfo()['job'];
        formValidators['edit_profile'].resetValidation();
        editForm.open();
    });

    const addCardForm = new PopupWithForm(
        '[name="add_place"]',
        (inputs) => {
            createCard({
                name: inputs['place-name'],
                link: inputs['place-link']
            });
        });
    addCardForm.setEventListeners();
    placeAddButton.addEventListener('click',
        () => {
            formValidators['add_place'].resetValidation();
            addCardForm.open();
        });

    enableValidation(formConfig);
})();
