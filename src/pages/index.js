import {Card, FormValidator, PopupWithForm, PopupWithImage, Section, UserInfo} from "../components";
import {
    avatarEditButton,
    avatarSubmitButton,
    formConfig,
    options,
    placeAddButton, placeSubmitButton, POPUP,
    profileEditButton,
    profileSubmitButton, removeCardInputSelector,
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
                    cardApi.deleteLike(card.getId(), ({likes}) => card.setLike(likes));
                } else {
                    cardApi.putLike(card.getId(), ({likes}) => card.setLike(likes));
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

    function popupLoaderCallback(loading, button, form, loadText = 'Сохранение', loadedText = 'Сохранить') {
        if (loading) {
            button.classList.add('form__submit_loading');
            button.textContent = loadText;
        } else {
            button.classList.remove('form__submit_loading');
            button.textContent = loadedText;
            form.close();
        }
    }

    const userInfo = new UserInfo(userInfoSelectors);
    const userApi = new UserApi(options);
    userApi.getUserInfo((data) => {
        userInfo.setUserInfo(data)
    });

    const profileEditForm = new PopupWithForm(
        POPUP.profileEdit,
        (inputsData) => {
            userApi.patchUserInfo(
                inputsData,
                (data) => {
                    userInfo.setUserInfo(data);
                },
                (loading) => popupLoaderCallback(loading, profileSubmitButton, profileEditForm));
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
            userApi.patchUserAvatar(
                inputsData,
                (data) => {
                    userInfo.setUserInfo(data);
                },
                (loading) => popupLoaderCallback(loading, avatarSubmitButton, avatarEditForm));
        });
    avatarEditForm.setEventListeners();
    avatarEditButton.addEventListener('click', () => {
        setUserInfoInputs(userInfo.getUserInfo());
        formValidators['edit_avatar'].resetValidation();
        avatarEditForm.open();
    });




    const cardApi = new CardApi(options);
    cardApi.getCards((data) => {
        data.reverse().forEach((card) => {
            createCard(card)
        });
    });

    const popupWithImage = new PopupWithImage(POPUP.fullscreen);
    popupWithImage.setEventListeners();

    const popupRemoveConfirm = new PopupWithForm(
        POPUP.removePlace,
        ({_id}) => {
            cardApi.deleteCard(_id,
                () => {
                    document.getElementById(_id).remove();
                },
                (loading) => popupLoaderCallback(
                    loading,
                    popupRemoveConfirm.getSubmitButton(),
                    popupRemoveConfirm,
                    'Удаление',
                    'Да',
                ));
        });
    popupRemoveConfirm.setEventListeners();

    const placeList = new Section({
            items: [],
            renderer: createCard
        },
        '.places');

    const addCardForm = new PopupWithForm(
        POPUP.addPlace,
        (item) => {
            cardApi.postCard(
                item,
                (data) => {
                    createCard(data);
                    addCardForm.close();
                },
                (loading) => {
                    popupLoaderCallback(loading, placeSubmitButton, addCardForm)
                });
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
})();
