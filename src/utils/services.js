class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _request(path,
             init = undefined) {
        init.headers = {...init.headers, ...this._headers};
        return fetch(`${this._baseUrl}/${path}`, init)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            });
    }
}

class UserApi extends Api {
    constructor(options, errorCallback) {
        super(options, errorCallback);
    }

    getUserInfo() {
        const path = 'users/me';
        return this._request(path, {});
    }

    patchUserInfo(data) {
        const path = 'users/me';
        return this._request(path, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }

    patchUserAvatar(data = undefined) {
        const path = `users/me/avatar`;
        return this._request(path, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }
}

class CardApi extends Api {
    constructor(options, errorCallback) {
        super(options, errorCallback);
    }

    getCards() {
        const path = 'cards';
        return this._request(path, {});
    }

    postCard(data = undefined) {
        const path = 'cards';
        return this._request(path, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    deleteCard(cardId = undefined) {
        const path = `cards/${cardId}`;
        return this._request(path, {
            method: 'DELETE',
        });
    }

    putLike(cardId = undefined) {
        const path = `cards/${cardId}/likes`;
        return this._request(path, {
            method: 'PUT',
        });
    }

    deleteLike(cardId = undefined) {
        const path = `cards/${cardId}/likes`;
        return this._request(path, {
            method: 'DELETE',
        });
    }
}

export {Api, UserApi, CardApi}