const BASE_URL = 'https://api.nomoreparties.co';

class MainApi {
    constructor(options) {
        this._url = options.baseUrl;
    }

    getInitialMovie() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/movies`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
        .then(handleResponse)
    }

    removeMovie(movieId) {
        return fetch(`${this._url}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        }).then(handleResponse)
    }

    addMovie(movie) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `${BASE_URL}${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `${BASE_URL}${movie.image.formats.thumbnail.url}`,
                movieId: `${movie.id}`,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN
            })
        }).then(handleResponse)
    }

    tokenValidity() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(handleResponse)
    }

    signUp(password, email, name) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email,
                name: name
            })
        })
            .then(handleResponse)
    }

    signIn(password, email) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
            .then(handleResponse)
    }

    getInfoAboutUser() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
            .then(handleResponse)
    }

    setInfoAboutUser(name, email) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
            .then(handleResponse)
    }

}



const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(new Error("Произошла ошибка"));
}

const mainApi = new MainApi({
    baseUrl: 'http://localhost:3001/api',
});

export default mainApi;