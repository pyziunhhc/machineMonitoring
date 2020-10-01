import users from '../helpers/fetch/user.js'
import helpers from '../helpers/auxiliaryFunctions.js'
import message from '../helpers/messages.js'
import Movebelt from '../Movebelt/movebelt.js';
class Users {
    constructor() {
        this.logins = ['Login'],
            this.email = ['Email'],
            this.name = ['Imię'],
            this.surname = ['Nazwisko'],
            this.role = ['Rola'],
            this.lastUpdate = ['Ostatnia aktualizacja'];
        this.oldPassword = null;
    }
    getUsers() {
        users.showUsers()
            .then(res => {
                if (res.status == 200) {
                    this.createUsers(res.users)
                    this.createRegistrationContainer();
                }
            })
    }

    createUsers(data) {
        const container = document.querySelector('.users__container');
        Object.values(data)
            .map(user => {
                const userContainer = document.createElement('div'),
                    userImage = document.createElement('img'),
                    userLogin = document.createElement('h3');

                userContainer.classList.add('user__container');
                userImage.classList.add('user__image');
                userLogin.classList.add('user__login');

                userImage.setAttribute('src', `/images/user_icon.png`)
                userImage.setAttribute('data-value', user.login)
                userLogin.innerText = user.login;

                userImage.addEventListener('dblclick', e => {
                    const user = e.srcElement.dataset.value;
                    users.getUser(user)
                        .then(userData => {
                            this.editPanel(userData, userContainer)
                        })
                })
                userImage.addEventListener('contextmenu',
                    e => {
                        this.menu(e)
                    })
                userContainer.appendChild(userImage);
                userContainer.appendChild(userLogin);

                container.appendChild(userContainer)
            })

    }
    createRegistrationContainer() {
        const button = document.querySelector('.new');
        const minimizedPanel = document.querySelector('.minimized-panels');


        button.addEventListener('click', (e) => {
            const container = document.querySelector('.users__container'),
                registrationContainer = document.createElement('div'),
                registrationWrapper = document.createElement('div'),
                loginInput = document.createElement('input'),
                passwordInput = document.createElement('input'),
                repasswordInput = document.createElement('input'),
                nameInput = document.createElement('input'),
                surnameInput = document.createElement('input'),
                emailInput = document.createElement('input'),
                roleInput = document.createElement('select'),
                adminOption = document.createElement('option'),
                analystOption = document.createElement('option'),
                operatorOption = document.createElement('option'),
                submitButton = document.createElement('button');

            const loginLabel = document.createElement('label'),
                passwordLabel = document.createElement('label'),
                repasswordLabel = document.createElement('label'),
                nameLabel = document.createElement('label'),
                surnameLabel = document.createElement('label'),
                emailLabel = document.createElement('label'),
                roleLabel = document.createElement('label');

            const head = document.createElement('h1');
            const moveBelt = new Movebelt(null, registrationContainer, minimizedPanel, 'Dodaj użytkownika');
            moveBelt.create();
            submitButton.addEventListener('click', (e) => {
                this.register(loginInput.value, passwordInput.value, repasswordInput.value, nameInput.value, surnameInput.value, emailInput.value, roleInput.value, registrationContainer);
            })

            //Klasy
            registrationContainer.classList.add('registration__container')
            registrationWrapper.classList.add('registration__wrapper');
            submitButton.classList.add('submit')
            //Tekst
            submitButton.innerText = 'Dodaj';
            loginLabel.innerText = 'Login';
            passwordLabel.innerText = 'Hasło';
            repasswordLabel.innerText = 'Powtórz hasło';
            nameLabel.innerText = 'Imię';
            surnameLabel.innerText = 'Nazwisko';
            emailLabel.innerText = 'Adres email';
            roleLabel.innerText = 'Rola';
            adminOption.innerText = 'Administrator';
            analystOption.innerText = 'Analityk';
            operatorOption.innerText = 'Operator';

            //Atrybuty
            loginInput.setAttribute('type', 'text')
            passwordInput.setAttribute('type', 'password')
            repasswordInput.setAttribute('type', 'password')
            nameInput.setAttribute('type', 'text')
            surnameInput.setAttribute('type', 'text')
            emailInput.setAttribute('type', 'email')
            //Inne
            roleInput.options.add(adminOption, 1);
            roleInput.options.add(analystOption, 2);
            roleInput.options.add(operatorOption, 3);

            //Łączenie
            registrationWrapper.appendChild(loginLabel)
            registrationWrapper.appendChild(loginInput);
            registrationWrapper.appendChild(passwordLabel)
            registrationWrapper.appendChild(passwordInput)
            registrationWrapper.appendChild(repasswordLabel)
            registrationWrapper.appendChild(repasswordInput)
            registrationWrapper.appendChild(nameLabel)
            registrationWrapper.appendChild(nameInput)
            registrationWrapper.appendChild(surnameLabel)
            registrationWrapper.appendChild(surnameInput)
            registrationWrapper.appendChild(emailLabel)
            registrationWrapper.appendChild(emailInput)
            registrationWrapper.appendChild(roleLabel)
            registrationWrapper.appendChild(roleInput)
            registrationWrapper.appendChild(submitButton)
            //registrationContainer.appendChild(belt);

            registrationContainer.appendChild(head);
            registrationContainer.appendChild(registrationWrapper);

            container.appendChild(registrationContainer);
        })




    }
    register(login, password, repassword, name, surname, email, role, container) {
        const dataToSend = {
            login: login.toLowerCase(),
            password: password,
            repassword: repassword,
            name: name,
            surname: surname,
            email: email.toLowerCase(),
            role: role.toLowerCase()
        }

        users.registerUser(dataToSend)
            .then(res => {
                if (res.status == 200) {
                    message.showMessage('success', res.message);
                    container.remove();
                    users.showUsers()
                        .then(res => {
                            if (res.status == 200) {
                                const user = {
                                    user: res.users[res.users.length - 1]
                                }
                                this.createUsers(user)
                            }
                        })
                } else {
                    message.showMessage('error', res.message);
                    container.remove();
                }
            })
    }
    menu(e) {
        const that = e;
        e.preventDefault();
        const menu = document.createElement('div'),
            menuElements = document.createElement('ul'),
            editUser = document.createElement('li'),
            deleteUser = document.createElement('li');
        const isExist = document.querySelector('.additional-menu__container')
        editUser.innerText = 'Edytuj';
        deleteUser.innerText = 'Usuń';
        //Akcje
        window.addEventListener('click', e => {
            const isExist = document.querySelector('.additional-menu__container')
            if (isExist) {
                isExist.remove()
            }
        })
        editUser.addEventListener('click', (e) => {
            const user = e.path[3].childNodes[0].dataset.value
            users.getUser(user)
                .then(userData => {
                    this.editPanel(userData, that.path[1])
                    menu.remove();
                })
        })
        deleteUser.addEventListener('click', (e) => {
            const user = {
                login: e.path[3].childNodes[0].dataset.value
            };

            this.removeUser(user, that)
        })

        menuElements.appendChild(editUser);
        menuElements.appendChild(deleteUser);

        menu.classList.add('additional-menu__container');

        if (that.button == 2) {
            if (isExist) {
                isExist.remove();
                menu.appendChild(menuElements)
                that.path[1].appendChild(menu)
            } else {
                menu.appendChild(menuElements)
                that.path[1].appendChild(menu)
            }

        }
    }
    editPanel(data, e) {
        const panelContainer = document.createElement('div'),
            panelWrapper = document.createElement('div'),
            infoPanel = document.createElement('div'),
            actionPanel = document.createElement('div'),
            removeButton = document.createElement('button');
        const minimizedPanel = document.querySelector('.minimized-panels');

        const moveBelt = new Movebelt(null, panelContainer, minimizedPanel, 'Edycja użytkownika');
        moveBelt.create()
        const container = e;

        //Tekst
        removeButton.innerText = 'Usuń';
        for (let [key, value] of Object.entries(data.user)) {
            switch (key) {
                case 'login': {
                    const login = document.createElement('p');
                    login.innerText = `Login: ${value}`;
                    infoPanel.appendChild(login)

                }
                break;
            case 'password': {
                const changePasswordButton = document.createElement('button');
                changePasswordButton.innerText = 'Zmień hasło'
                changePasswordButton.addEventListener('click', this.createChangePasswordContainer.bind(this, data.user.login))
                actionPanel.appendChild(changePasswordButton)
            }
            break;
            case 'email': {
                const email = document.createElement('p'),
                    changeEmailButton = document.createElement('button');
                email.innerText = `Email: ${value}`;
                changeEmailButton.innerText = 'Zmień email'

                infoPanel.appendChild(email)
                actionPanel.appendChild(changeEmailButton)
            }
            break;
            case 'name': {
                const name = document.createElement('p');
                name.innerText = `Imię: ${value}`;
                infoPanel.appendChild(name)
            }
            break;
            case 'surname': {
                const surname = document.createElement('p');
                surname.innerText = `Nazwisko: ${value}`;
                infoPanel.appendChild(surname)

            }
            break;
            case 'role': {
                const role = document.createElement('p');
                role.innerText = `Rola: ${value}`;
                infoPanel.appendChild(role)

            }
            break;
            }

        }
        //Klasy
        panelContainer.classList.add('edit-panel__container');
        infoPanel.classList.add('edit-panel__information');
        actionPanel.classList.add('edit-panel__actions');
        panelWrapper.classList.add('edit-panel__wrapper');
        removeButton.classList.add('remove');
        //Akcje
        removeButton.addEventListener('click', (e) => {
            const user = {
                login: data.user.login
            }
            this.removeUser(user)
            container.remove();
        })
        //Łączenie
        actionPanel.appendChild(removeButton)
        panelWrapper.appendChild(infoPanel);
        panelWrapper.appendChild(actionPanel);
        panelContainer.appendChild(panelWrapper)
        container.appendChild(panelContainer)
    }
    createChangePasswordContainer(login) {
        const changePasswordContainer = document.createElement('div'),
            changePasswordWrapper = document.createElement('div'),
            actionsContainer = document.createElement('div'),
            oldPasswordContainer = document.createElement('input'),
            newPasswordContainer = document.createElement('input'),
            reNewPasswordContainer = document.createElement('input'),
            submitButton = document.createElement('button'),
            cancelButton = document.createElement('button');

        const container = document.querySelector('.users__container');

        //Tekst
        submitButton.innerText = 'Potwierdź';
        cancelButton.innerText = 'Anuluj';
        //Atrybuty
        oldPasswordContainer.setAttribute('type', 'password');
        newPasswordContainer.setAttribute('type', 'password');
        reNewPasswordContainer.setAttribute('type', 'password');
        oldPasswordContainer.setAttribute('placeholder', 'Stare hasło');
        newPasswordContainer.setAttribute('placeholder', 'Nowe hasło');
        reNewPasswordContainer.setAttribute('placeholder', 'Powtórz nowe hasło');
        //Klasy
        changePasswordContainer.classList.add('change-password__container')
        changePasswordWrapper.classList.add('change-password__wrapper');
        actionsContainer.classList.add('actions')
        submitButton.classList.add('submit-button');
        cancelButton.classList.add('cancel-button');
        //Akcje
        submitButton.addEventListener('click', (e) => {
            this.changePassword(login, oldPasswordContainer, newPasswordContainer, reNewPasswordContainer, changePasswordContainer)
        })
        cancelButton.addEventListener('click', e => {
            changePasswordContainer.remove();
        })

        changePasswordWrapper.appendChild(oldPasswordContainer);
        changePasswordWrapper.appendChild(newPasswordContainer);
        changePasswordWrapper.appendChild(reNewPasswordContainer);
        actionsContainer.appendChild(submitButton);
        actionsContainer.appendChild(cancelButton);
        changePasswordWrapper.appendChild(actionsContainer);
        changePasswordContainer.appendChild(changePasswordWrapper)


        container.appendChild(changePasswordContainer);
    }
    changePassword(login, oldpasswd, newpasswd, renewpasswd, container) {
        const data = {
            login: login,
            oldPassword: oldpasswd.value,
            newPassword: newpasswd.value,
            reNewPassword: renewpasswd.value
        }
        console.log(this)
        users.changePassword(data).then(res => {
            if (res.status == 200) {
                users.showMessage('success', res.message)
                container.remove();
            } else {
                users.showMessage('error', res.message)
            }
        })
    }
    removeUser(user, event) {
        users.removeUser(user).then(res => {
            if (res.status == 200) {
                users.showMessage('success', res.message)
                users.showUsers()
                    .then(res => {
                        if (res.status == 200) {
                            event.target.parentElement.remove()
                        }
                    })
            } else {
                users.showMessage('error', res.message)
            }
        })
    }
}

export default Users;