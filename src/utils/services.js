class Api {
    constructor({baseUrl, headers},
                errorCallback = (err) => console.log(err)) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._errorCallback = errorCallback;
    }

    _request(path,
             init = undefined,
             responseCallback = (data) => console.log(data),
             loadingCallback = undefined) {
        if (loadingCallback) {
            loadingCallback(true);
        }
        init.headers = {...init.headers, ...this._headers};
        return fetch(`${this._baseUrl}/${path}`, init)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(data => responseCallback(data))
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

    getUserInfo(responseCallback = undefined, loadingCallback = undefined) {
        const path = 'users/me';
        return this._request(path, {}, responseCallback, loadingCallback);
    }

    patchUserInfo(data, responseCallback = undefined, loadingCallback = undefined) {
        const path = 'users/me';
        return this._request(path, {
            method: 'PATCH',
            body: JSON.stringify(data)
        }, responseCallback, loadingCallback);
    }

    patchUserAvatar(data, responseCallback = undefined, loadingCallback = undefined) {
        const path = `users/me/avatar`;
        return this._request(path, {
            method: 'PATCH',
            body: JSON.stringify(data)
        }, responseCallback, loadingCallback);
    }
}

class CardApi extends Api {
    constructor(options, errorCallback) {
        super(options, errorCallback);
    }

    getCards(responseCallback = undefined, loadingCallback = undefined) {
        const path = 'cards';
        return this._request(path, {}, responseCallback, loadingCallback);
    }

    postCard(data, responseCallback = undefined, loadingCallback = undefined) {
        const path = 'cards';
        return this._request(path, {
            method: 'POST',
            body: JSON.stringify(data)
        }, responseCallback, loadingCallback);
    }

    deleteCard(cardId, responseCallback = undefined, loadingCallback = undefined) {
        const path = `cards/${cardId}`;
        return this._request(path, {
            method: 'DELETE',
        }, responseCallback, loadingCallback);
    }

    putLike(cardId, responseCallback = undefined, loadingCallback = undefined) {
        const path = `cards/${cardId}/likes`;
        return this._request(path, {
            method: 'PUT',
        }, responseCallback, loadingCallback);
    }

    deleteLike(cardId, responseCallback = undefined, loadingCallback = undefined) {
        const path = `cards/${cardId}/likes`;
        return this._request(path, {
            method: 'DELETE',
        }, responseCallback, loadingCallback);
    }
}

export {Api, UserApi, CardApi}