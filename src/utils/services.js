const base_url = `https://nomoreparties.co/v1/`;

async function _request(input: RequestInfo,
                        init?: RequestInit,
                        errorCallback = (err) => alert(err),
                        loadingCallback) {
    loadingCallback(true);

    init.headers.append('authorization', 'c56e30dc-2883-4270-a59e-b2f7bae969c6');
    init.headers.append('Content-Type', 'application/json');

    return await fetch(input, init)
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(res.statusText);
        })
        .catch(err => errorCallback(err))
        .finally(loadingCallback(false));
}

async function getUserInfo(cohortId, errorCallback, loadingCallback) {
    const url = `${base_url}${cohortId}/users/me`;
    return await _request(url, {}, errorCallback, loadingCallback);
}

async function patchUserInfo(data, cohortId, errorCallback, loadingCallback) {
    const url = `${base_url}${cohortId}/users/me`;
    return await _request(url, {
        method: 'PATCH',
        body: JSON.stringify(data)
    }, errorCallback, loadingCallback);
}

async function patchUserAvatar(data, cohortId, errorCallback, loadingCallback) {
    const url = `${base_url}${cohortId}/users/me/avatar`;
    return await _request(url, {
        method: 'PATCH',
        body: JSON.stringify(data)
    }, errorCallback, loadingCallback);
}

async function getCards(cohortId, errorCallback, loadingCallback) {
    const url = `${base_url}${cohortId}/cards`;
    return await _request(url, {}, errorCallback, loadingCallback);
}

async function postCard(data, cohortId, errorCallback, loadingCallback) {
    const url = `${base_url}${cohortId}/cards`;
    return await _request(url, {
        method: 'POST',
        body: JSON.stringify(data)
    }, errorCallback, loadingCallback);
}


async function deleteCard(cardId, cohortId, errorCallback, loadingCallback) {
    const url = `${base_url}${cohortId}/cards/${cardId}`;
    return await _request(url, {
        method: 'DELETE',
    }, errorCallback, loadingCallback);
}

async function putLike(cardId, cohortId, errorCallback, loadingCallback) {
    const url = `${base_url}${cohortId}/cards/${cardId}/likes`;
    return await _request(url, {
        method: 'PUT',
    }, errorCallback, loadingCallback);
}

async function deleteLike(cardId, cohortId, errorCallback, loadingCallback) {
    const url = `${base_url}${cohortId}/cards/${cardId}/likes`;
    return await _request(url, {
        method: 'DELETE',
    }, errorCallback, loadingCallback);
}


export {getUserInfo}