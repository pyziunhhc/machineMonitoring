import message from '../helpers/messages.js'
import Movebelt from '../Movebelt/movebelt.js';
class Server {
    constructor(container, data = {
        ip: null,
        port: null,
        apiVersion: null,
        login: null,
        password: null,
        testMode: null
    }, ) {
        this._data = data[0];
        this._container = container;
    }
    createDOM() {
        const containerWrapper = document.createElement('div'),
            container = document.createElement('div'),
            ipLabel = document.createElement('label'),
            ipInput = document.createElement('input'),
            portLabel = document.createElement('label'),
            portInput = document.createElement('input'),
            apiVersionLabel = document.createElement('label'),
            apiVersionInput = document.createElement('input'),
            loginLabel = document.createElement('label'),
            loginInput = document.createElement('input'),
            passwordInput = document.createElement('input'),
            passwordLabel = document.createElement('label'),
            testModeLabel = document.createElement('label'),
            testModeInput = document.createElement('input'),

            confirmButton = document.createElement('button');
        const minimizedPanel = document.querySelector('.minimized-panels');
        const movebelt = new Movebelt(null, containerWrapper, minimizedPanel, 'Ustawienia serwera')
        movebelt.create()


        ipInput.setAttribute('type', 'text');
        portInput.setAttribute('type', 'text')
        apiVersionInput.setAttribute('type', 'text')
        loginInput.setAttribute('type', 'text')
        passwordInput.setAttribute('password', 'text')
        testModeInput.setAttribute('type', 'checkbox');

        ipInput.setAttribute('name', 'ip');
        portInput.setAttribute('name', 'port')
        apiVersionInput.setAttribute('name', 'api-version')
        loginInput.setAttribute('name', 'login')
        passwordInput.setAttribute('name', 'password')
        testModeInput.setAttribute('name', 'production-or-test')

        testModeLabel.setAttribute('for', 'production-or-test')
        ipLabel.setAttribute('for', 'ip')
        portLabel.setAttribute('for', 'port')
        apiVersionLabel.setAttribute('for', 'api-version')
        loginLabel.setAttribute('for', 'login')
        passwordLabel.setAttribute('for', 'password')
        confirmButton.setAttribute('type', 'submit')


        containerWrapper.classList.add('settings__container');
        container.classList.add('container');


        confirmButton.innerText = 'Zapisz';
        ipLabel.innerText = 'Adres IP'
        portLabel.innerText = 'Port'
        apiVersionLabel.innerText = 'Wersja API'
        loginLabel.innerText = 'Login'
        passwordLabel.innerText = 'Hasło'
        testModeLabel.innerText = 'Tryb testowy';
        if (this._data) {
            ipInput.value = this._data.ip;
            portInput.value = this._data.port;
            apiVersionInput.value = this._data.apiVersion;
            testModeInput.checked = this._data.testMode;
        }
        ipInput.addEventListener('change', e => {
            this._data.ip = e.target.value;
        })
        portInput.addEventListener('change', e => {
            this._data.port = e.target.value;
        })
        apiVersionInput.addEventListener('change', e => {
            this._data.apiVersion = e.target.value;
        })
        loginInput.addEventListener('change', e => {
            this._data.login = e.target.value;
        })
        passwordInput.addEventListener('change', e => {
            this._data.password = e.target.value;
        })
        testModeInput.addEventListener('change', e => {
            console.log(e)
            this._data.testMode = e.target.checked;
        })
        confirmButton.addEventListener('click', this.save.bind(this))
        ipLabel.appendChild(ipInput)
        portLabel.appendChild(portInput)
        apiVersionLabel.appendChild(apiVersionInput)
        loginLabel.appendChild(loginInput)
        passwordLabel.appendChild(passwordInput)
        testModeLabel.appendChild(testModeInput);



        container.appendChild(ipLabel)
        container.appendChild(portLabel)
        container.appendChild(apiVersionLabel)
        container.appendChild(loginLabel)
        container.appendChild(passwordLabel)
        container.appendChild(testModeLabel);
        container.appendChild(confirmButton);

        containerWrapper.appendChild(container)
        this._container.appendChild(containerWrapper);


    }
    save() {
        console.log('test')
        fetch('/api/server/save', {
                method: 'POST',
                body: JSON.stringify(this._data),
                credentials: 'include',
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json)
            })
    }
}

export default Server;