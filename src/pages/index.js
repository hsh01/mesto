import {Card, FormValidator, PopupWithForm, PopupWithImage, Section, UserInfo} from "../components";
import {
    avatarEditButton,
    formConfig,
    options,
    placeAddButton,
    POPUP,
    profileEditButton,
    removeCardInputSelector,
    userInfoInputSelectors,
    userInfoSelectors
} from "../utils/constants.js";
import '../pages/index.css';
import {CardApi, UserApi} from "../utils/services";

(() => {
    function createCard(item) {
        const card = new Card(
            item,
            userInfo.getUserId(),
            '.place-template',
            (item) => {
                popupWithImage.open(item)
            },
            () => {
                if (card.getIsLiked()) {
                    cardApi.deleteLike(card.getId())
                        .then(({likes}) => card.setLike(likes));
                } else {
                    cardApi.putLike(card.getId())
                        .then(({likes}) => card.setLike(likes));
                }
            },
            () => {
                removeCardInputSelector.value = card.getId();
                popupRemoveConfirm.open();
            });
        const cardElement = card.generateCard();
        placeList.addItem(cardElement);
    }

    function setUserInfoInputs(inputData) {
        Object.keys(inputData).forEach((input) => {
            if (input in userInfoInputSelectors) {
                userInfoInputSelectors[input].value = inputData[input];
            }
        });
    }

    const profileEditForm = new PopupWithForm(
        POPUP.profileEdit,
        (inputsData) => {
            userApi.patchUserInfo(inputsData)
                .then((data) => {
                    userInfo.setUserInfo(data);
                    profileEditForm.popupSuccessCallback();
                })
                .catch((err) => profileEditForm.popupErrorCallback(err))
                .finally((loading) => profileEditForm.popupLoaderCallback(loading));
        });

    profileEditForm.setEventListeners();
    profileEditButton.addEventListener('click', () => {
        setUserInfoInputs(userInfo.getUserInfo());
        formValidators['edit_profile'].resetValidation();
        profileEditForm.open();
    });

    const avatarEditForm = new PopupWithForm(
        POPUP.avatarEdit,
        (inputsData) => {
            userApi.patchUserAvatar(inputsData)
                .then((data) => {
                    userInfo.setUserInfo(data);
                    avatarEditForm.popupSuccessCallback();
                })
                .catch((err) => avatarEditForm.popupErrorCallback(err))
                .finally((loading) => avatarEditForm.popupLoaderCallback(loading));
        });
    avatarEditForm.setEventListeners();
    avatarEditButton.addEventListener('click', () => {
        setUserInfoInputs(userInfo.getUserInfo());
        formValidators['edit_avatar'].resetValidation();
        avatarEditForm.open();
    });

    const popupWithImage = new PopupWithImage(POPUP.fullscreen);
    popupWithImage.setEventListeners();

    const popupRemoveConfirm = new PopupWithForm(
        POPUP.removePlace,
        ({_id}) => {
            cardApi.deleteCard(_id)
                .then(() => {
                    document.getElementById(_id).remove();
                    popupRemoveConfirm.popupSuccessCallback('Да', 'Удалено');
                })
                .catch(err => popupRemoveConfirm.popupErrorCallback(err))
                .finally((loading) => popupRemoveConfirm.popupLoaderCallback(loading, 'Удаление'));
        });
    popupRemoveConfirm.setEventListeners();

    const placeList = new Section({items: [], renderer: createCard}, '.places');

    const addCardForm = new PopupWithForm(
        POPUP.addPlace,
        (item) => {
            cardApi.postCard(item)
                .then((data) => {
                    createCard(data);
                    addCardForm.popupSuccessCallback('Создать', 'Создание');
                })
                .catch(err => addCardForm.popupErrorCallback(err, 'Создать'))
                .finally((loading) => addCardForm.popupLoaderCallback(loading, 'Создание'))
        });

    addCardForm.setEventListeners();
    placeAddButton.addEventListener('click',
        () => {
            formValidators['add_place'].resetValidation();
            addCardForm.open();
        });


    const formValidators = {};

    function enableValidation(config) {
        const formList = Array.from(document.forms);
        formList.forEach((formElement) => {
            const validator = new FormValidator(formElement, config);
            const formName = formElement.getAttribute('name');
            formValidators[formName] = validator;
            validator.enableValidation();
        });
    }

    enableValidation(formConfig);

    const userInfo = new UserInfo(userInfoSelectors);
    const userApi = new UserApi(options);
    const cardApi = new CardApi(options);

    userApi.getUserInfo()
        .then((data) => {
            userInfo.setUserInfo(data)
        })
        .then(() => {
            cardApi.getCards()
                .then((data) => {
                    data.reverse().forEach((card) => {
                        createCard(card)
                    });
                })
        });

})();
