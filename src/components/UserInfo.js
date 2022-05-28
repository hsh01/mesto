class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {
            profile_name: this._nameElement.textContent,
            profile_job: this._jobElement.textContent
        }
    }

    setUserInfo({profile_name, profile_job}) {
        this._nameElement.textContent = profile_name;
        this._jobElement.textContent = profile_job;
    }
}

export default UserInfo;