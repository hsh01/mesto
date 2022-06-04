class UserInfo {
    constructor({nameSelector, aboutSelector, avatarSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserId() {
        return this._id;
    }

    getUserInfo() {
        return {
            _id: this._id,
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
            avatar: this._avatarElement.src
        }
    }

    setUserInfo({_id, name, about, avatar}) {
        this._id = _id;
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this._avatarElement.src = avatar;
    }
}

export default UserInfo;