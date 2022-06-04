class Api {
    constructor({baseUrl, headers},
                errorCallback = (err) => console.log(err)) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._errorCallback = errorCallback;
    }

    _request(path,
             init = undefined,
             loadingCallback = undefined) {
        if (loadingCallback) {
            loadingCallback(true);
        }
        init.headers = {...init.headers, ...this._headers};
        const result = null;
        return fetch(`${this._baseUrl}/${path}`, init)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(err => this._errorCallback(err))
            .finally(() => {
                if (loadingCallback) loadingCallback(false);
            });
    }
}

class UserApi extends Api {
    constructor(options, errorCallback) {
        super(options, errorCallback);
    }

    getUserInfo(loadingCallback = undefined) {
        const path = 'users/me';
        return this._request(path, {}, loadingCallback);
    }

    patchUserInfo(data, loadingCallback = undefined) {
        const path = 'users/me';
        return this._request(path, {
            method: 'PATCH',
            body: JSON.stringify(data)
        }, loadingCallback);
    }

    patchUserAvatar(data, loadingCallback = undefined) {
        const path = `users/me/avatar`;
        return this._request(path, {
            method: 'PATCH',
            body: JSON.stringify(data)
        }, loadingCallback);
    }
}

class CardApi extends Api {
    constructor(options, errorCallback) {
        super(options, errorCallback);
    }

    getCards(loadingCallback = undefined) {
        const path = 'cards';
        return this._request(path, {}, loadingCallback);
    }

    postCard(data, loadingCallback = undefined) {
        const path = 'cards';
        return this._request(path, {
            method: 'POST',
            body: JSON.stringify(data)
        }, loadingCallback);
    }

    deleteCard(cardId, loadingCallback = undefined) {
        const path = `cards/${cardId}`;
        return this._request(path, {
            method: 'DELETE',
        }, loadingCallback);
    }

    putLike(cardId, loadingCallback = undefined) {
        const path = `cards/${cardId}/likes`;
        return this._request(path, {
            method: 'PUT',
        }, loadingCallback);
    }

    deleteLike(cardId, loadingCallback = undefined) {
        const path = `cards/${cardId}/likes`;
        return this._request(path, {
            method: 'DELETE',
        }, loadingCallback);
    }
}

export {Api, UserApi, CardApi}