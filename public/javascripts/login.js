import helpers from './helpers/fetch.js'

window.onload = function () {
    const sendButton = document.querySelector('#send');


    sendButton.addEventListener('click', authUser.bind(this))
    password.addEventListener('keypress', authUser.bind(this))
}

const isEmpty = (e, credentials) => {
    if (e.type == "keypress") {
        if (e.keyCode == '13') {
            if (!credentials.login || !credentials.password) {
                alert('login i hasło nie mogą być puste')
                return false;
            } else {
                return true;
            }
        }
    } else {
        if (!credentials.login || !credentials.password) {
            alert('login i hasło nie mogą być puste')
            return false;
        } else {
            return true;
        }
    }


}

const authUser = (e) => {
    const loginField = document.querySelector('#login'),
        passwordField = document.querySelector('#password');
    const credentials = {
        login: loginField.value,
        password: passwordField.value
    }
    const credentialsIsEmpty = isEmpty(e, credentials);
    if (credentialsIsEmpty) {
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
    }
}