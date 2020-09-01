import helpers from './helpers/fetch.js'

window.onload = function () {
    const sendButton = document.querySelector('#send');
    sendButton.addEventListener('click', (e) => {
        const loginField = document.querySelector('#login').value,
            passwordField = document.querySelector('#password').value;
        //sprawdz login i haslo czy nie sa puste
        const credentials = {
            login: loginField,
            password: passwordField
        }
        fetch('/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
                credentials: 'include',
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json())
            .then(res => {
                if (res.status == 'success') {
                    window.location = res.redirect;
                } else {
                    helpers.showMessage('error', res.message)
                }
            })
    })
}