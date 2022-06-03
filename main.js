(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._inactiveButtonClass=n.inactiveButtonClass,this._inputErrorClass=n.inputErrorClass,this._errorClass=n.errorClass,this._freezePlaceholderClass=n.freezePlaceholderClass,this._form=e;var o=Array.from(this._form.querySelectorAll(n.fieldSelector));this._fieldList=[],o.forEach((function(e){r._fieldList.push({input:e.querySelector(n.inputSelector),error:e.querySelector(n.inputErrorSelector),placeholder:e.querySelector(n.placeholderSelector)})})),this._submitButton=this._form.querySelector(n.submitButtonSelector)}var n,r;return n=t,(r=[{key:"_showError",value:function(e){e.input.classList.add(this._inputErrorClass),e.error.textContent=e.input.validationMessage,e.error.classList.add(this._errorClass)}},{key:"_hideError",value:function(e){e.input.classList.remove(this._inputErrorClass),e.error.classList.remove(this._errorClass),e.error.textContent=""}},{key:"_checkInputValidity",value:function(e){e.input.validity.valid?this._hideError(e):this._showError(e)}},{key:"_hasInvalidInput",value:function(){return this._fieldList.some((function(e){return!e.input.validity.valid}))}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput(this._fieldList)?(this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.disabled=!0):(this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.disabled=!1)}},{key:"_freezePlaceholder",value:function(e){e.classList.add(this._freezePlaceholderClass)}},{key:"_unfreezePlaceholder",value:function(e){e.classList.remove(this._freezePlaceholderClass)}},{key:"_isEmpty",value:function(e){!e.input.value.trim().length>=1?this._unfreezePlaceholder(e.placeholder):this._freezePlaceholder(e.placeholder)}},{key:"_togglePlaceholderState",value:function(){var e=this;this._fieldList.forEach((function(t){e._isEmpty(t)}))}},{key:"enableValidation",value:function(){var e=this;this._fieldList.forEach((function(t){t.input.addEventListener("input",(function(){e._checkInputValidity(t),e._isEmpty(t),e._toggleButtonState()}))}))}},{key:"resetValidation",value:function(){var e=this;this._togglePlaceholderState(),this._toggleButtonState(),this._fieldList.forEach((function(t){e._hideError(t)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const r=function(){function e(t,n,r){var o=t.name,i=t.link;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=o,this._link=i,this._templateSelector=n,this.isLiked=!1,this._handleImageClick=r,this._element=this._getTemplate(),this._titleElement=this._element.querySelector(".place__title"),this._cardImage=this._element.querySelector(".place__image"),this._likeElement=this._element.querySelector(".place__like"),this._trashElement=this._element.querySelector(".place__remove")}var t,r;return t=e,(r=[{key:"_handleLikeClick",value:function(){this.isLiked=!this.isLiked,this._likeElement.classList.toggle("place__like_active")}},{key:"_handleTrashClick",value:function(){this._element.remove()}},{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".place").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._cardImage.addEventListener("click",(function(){return e._handleImageClick({name:e._name,link:e._link})})),this._likeElement.addEventListener("click",(function(){return e._handleLikeClick()})),this._trashElement.addEventListener("click",(function(){return e._handleTrashClick()}))}},{key:"generateCard",value:function(){return this._cardImage.src=this._link,this._cardImage.alt=this._name,this._titleElement.textContent=this._name,this._setEventListeners(),this._element}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._element=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._element.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._element.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._element.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_opened")||t.target.classList.contains("popup__close"))&&e.close()}))}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(){return s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=c(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},s.apply(this,arguments)}function c(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=p(e)););return e}function u(e,t){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},u(e,t)}function f(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function p(e){return p=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},p(e)}const h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&u(e,t)}(l,e);var t,n,r,o,i=(r=l,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=p(r);if(o){var n=p(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return f(this,e)});function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=i.call(this,e))._imageElement=t._element.querySelector(".popup__img"),t._imageCaptionElement=t._element.querySelector(".popup__img-caption"),t}return t=l,(n=[{key:"open",value:function(e){var t=e.name,n=e.link;this._imageElement.src=n,this._imageElement.alt=t,this._imageCaptionElement.textContent=t,s(p(l.prototype),"open",this).call(this)}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),l}(i);function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const y=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(){var e=this;this.clear(),this._renderedItems.forEach((function(t){return e._renderer(t)}))}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const m=function(){function e(t){var n=t.nameSelector,r=t.jobSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(n),this._jobElement=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{username:this._nameElement.textContent,job:this._jobElement.textContent}}},{key:"setUserInfo",value:function(e){var t=e.username,n=e.job;this._nameElement.textContent=t,this._jobElement.textContent=n}}])&&_(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function k(){return k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=g(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},k.apply(this,arguments)}function g(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}function E(e,t){return E=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},E(e,t)}function w(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}const j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&E(e,t)}(l,e);var t,n,r,o,i=(r=l,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(r);if(o){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function l(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(n=i.call(this,e))._form=n._element.querySelector(".form"),n._callbackSubmitForm=t,n}return t=l,(n=[{key:"close",value:function(){k(S(l.prototype),"close",this).call(this),this._form.reset()}},{key:"_getInputValues",value:function(){var e={};return Array.from(this._form.querySelectorAll(".form__input")).forEach((function(t){var n=t.name,r=t.value;e[n]=r})),e}},{key:"setEventListeners",value:function(){var e=this;k(S(l.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._callbackSubmitForm(e._getInputValues()),e.close()}))}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),l}(i);var C={nameSelector:".profile__title",jobSelector:".profile__subtitle"},O={username:document.querySelector("input[name=username]"),job:document.querySelector("input[name=job]")},L=document.querySelector(".profile__edit-button"),P=document.querySelector(".profile__add-button"),I={fieldSelector:".form__field",inputSelector:".form__input",placeholderSelector:".form__placeholder",inputErrorSelector:".form__input-error",submitButtonSelector:".form__submit",inactiveButtonClass:"form__submit_disabled",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active",freezePlaceholderClass:"form__placeholder_is-fixed"},q=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}];!function(){function e(e){var t=new r(e,".place-template",(function(e){return o.open(e)})),n=t.generateCard();i.addItem(n)}var n={},o=new h(".popup_fullscreen");o.setEventListeners();var i=new y({items:q.reverse(),renderer:e},".places");i.renderItems();var l=new m(C),a=new j("#popup__edit-profile",(function(e){return l.setUserInfo(e)}));a.setEventListeners(),L.addEventListener("click",(function(){var e;e=l.getUserInfo(),O.username.value=e.username,O.job.value=e.job,n.edit_profile.resetValidation(),a.open()}));var s,c=new j("#popup__add-place",(function(t){return e(t)}));c.setEventListeners(),P.addEventListener("click",(function(){n.add_place.resetValidation(),c.open()})),s=I,Array.from(document.forms).forEach((function(e){var r=new t(e,s),o=e.getAttribute("name");n[o]=r,r.enableValidation()}))}()})();