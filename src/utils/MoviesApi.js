const config = {
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json'
    }
};

class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    getInitialMovies() {
        return fetch(this.url, {
            headers: this.headers
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(new Error("Произошла ошибка"));
    }
}

const movieApi = new Api(config);

export const getInitialMovies = movieApi.getInitialMovies.bind(movieApi);