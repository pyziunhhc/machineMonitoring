import helpers from '../helpers/fetch.js'

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
        helpers.showUsers()
            .then(res => {
                if (res.status == 200) {
                    this.prepareUsers(res.users);
                    this.createUserTable()
                    this.createRegistrationContainer();
                }
            })
    }
    getUser() {

    }
    prepareUsers(users) {
        this.logins = ['Login'];
        this.email = ['Email'];
        this.name = ['Imię'];
        this.surname = ['Nazwisko'];
        this.role = ['Rola'];
        this.lastUpdate = ['Ostatnia aktualizacja'];
        users.forEach(element => {
            this.logins.push(element.login)
            this.email.push(element.email)
            this.name.push(element.name)
            this.surname.push(element.surname)
            this.role.push(element.role)
            this.lastUpdate.push(element.updatedAt)
        });
    }
    createUserTable() {
        const table = document.createElement('table');
        const container = document.querySelector('.users__container'),
            old = document.querySelector('table');
        for (let i in this.logins) {
            let row = table.insertRow(i);
            row.setAttribute('data-value', this.logins[i])
            row.addEventListener('contextmenu', (e) => {
                this.menu(e)
            })
            row.addEventListener('click', (e) => {
                const isExist = document.querySelector('.additional-menu__container');
                if (isExist) {
                    isExist.remove();
                }
            })
            row.addEventListener('dblclick', (e) => {
                //włącz panel edycji
                const user = e.target.parentNode.dataset.value;
                helpers.getUser(user)
                    .then(userData => {
                        this.editPanel(userData)
                    })

            })
            for (let j = 0; j < 7; j++) {
                if (j === 0) {
                    let cell = row.insertCell(j);
                    cell.innerText = this.logins[i];
                    //cell.classList.add(statusesClass[i])
                } else if (j === 1) {
                    let cell = row.insertCell(j);
                    cell.innerText = this.name[i];
                    //cell.classList.add(statusesClass[i])
                } else if (j === 2) {
                    let cell = row.insertCell(j);
                    cell.innerText = this.surname[i];
                    //cell.classList.add(statusesClass[i])
                } else if (j === 3) {
                    let cell = row.insertCell(j);
                    cell.innerText = this.role[i];
                    //cell.classList.add(statusesClass[i])
                } else if (j === 4) {
                    let cell = row.insertCell(j);
                    cell.innerText = this.email[i];
                    //cell.classList.add(statusesClass[i])
                } else if (j === 5) {
                    let cell = row.insertCell(j);
                    cell.innerText = this.lastUpdate[i];
                    //cell.classList.add(statusesClass[i])
                }
            }
        }
        console.log(table, old)
        container.replaceChild(table, old)
    }
    createRegistrationContainer() {
        const button = document.querySelector('.users__new--button');

        button.addEventListener('click', (e) => {
            const container = document.querySelector('.users__container'),
                registrationContainer = document.createElement('div'),
                registrationWrapper = document.createElement('div'),
                belt = document.createElement('div'),
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
                submitButton = document.createElement('button'),
                closeButton = document.createElement('button');

            const loginLabel = document.createElement('label'),
                passwordLabel = document.createElement('label'),
                repasswordLabel = document.createElement('label'),
                nameLabel = document.createElement('label'),
                surnameLabel = document.createElement('label'),
                emailLabel = document.createElement('label'),
                roleLabel = document.createElement('label');

            const head = document.createElement('h1');

            //Eventy
            registrationContainer.addEventListener('mousedown', helpers.dragMouseDown.bind(null, this, registrationContainer));
            // submitButton.addEventListener('click', this.register.bind(this, loginInput.value, passwordInput.value, repasswordInput.value, nameInput.value, surnameInput.value, emailInput.value, roleInput.value));

            submitButton.addEventListener('click', (e) => {
                this.register(loginInput.value, passwordInput.value, repasswordInput.value, nameInput.value, surnameInput.value, emailInput.value, roleInput.value)
            })
            belt.addEventListener('click', (e) => {
                registrationContainer.remove();
            })
            //Klasy
            belt.classList.add('belt')
            registrationContainer.classList.add('registration__container')
            registrationWrapper.classList.add('registration__wrapper');
            submitButton.classList.add('submit')
            closeButton.classList.add('close')
            //Tekst
            head.innerText = 'Dodaj\n użytkownika'
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
            closeButton.innerText = 'X';

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
            belt.appendChild(closeButton)
            registrationWrapper.appendChild(belt)
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
    register(login, password, repassword, name, surname, email, role) {
        const dataToSend = {
            login: login,
            password: password,
            repassword: repassword,
            name: name,
            surname: surname,
            email: email,
            role: role
        }

        helpers.registerUser(dataToSend)
            .then(res => {
                if (res.status == 200) {
                    helpers.showMessage('success', res.message);
                    helpers.showUsers()
                        .then(res => {
                            if (res.status == 200) {
                                this.prepareUsers(res.users);
                                this.createUserTable()
                                this.createRegistrationContainer();
                            }
                        })
                } else {
                    helpers.showMessage('error', res.message)
                }
            })
    }


    menu(e) {
        e.preventDefault();
        const menu = document.createElement('div'),
            menuElements = document.createElement('ul'),
            editUser = document.createElement('li'),
            deleteUser = document.createElement('li');
        const isExist = document.querySelector('.additional-menu__container')

        editUser.innerText = 'Edytuj';
        deleteUser.innerText = 'Usuń';
        //Akcje

        editUser.addEventListener('click', (e) => {
            const user = e.path[4].dataset.value;
            helpers.getUser(user)
                .then(userData => {
                    this.editPanel(userData)
                })
        })
        deleteUser.addEventListener('click', (e) => {
            const user = {
                login: e.path[4].dataset.value
            };

            this.removeUser(user)
        })

        menuElements.appendChild(editUser);
        menuElements.appendChild(deleteUser);

        menu.classList.add('additional-menu__container');

        if (e.button == 2) {
            if (isExist) {
                isExist.remove();
                menu.appendChild(menuElements)
                e.target.appendChild(menu)
            } else {
                menu.appendChild(menuElements)
                e.target.appendChild(menu)
            }

        }
    }
    editPanel(data) {
        const panel = document.createElement('div'),
            panelWrapper = document.createElement('div'),
            infoPanel = document.createElement('div'),
            actionPanel = document.createElement('div'),
            heading = document.createElement('h3'),
            belt = document.createElement('div'),
            closeButton = document.createElement('button'),
            removeButton = document.createElement('button');

        const container = document.querySelector('.users__container');

        //Tekst
        heading.innerText = 'Edycja użytkownika'
        closeButton.innerText = 'X';
        removeButton.innerText = 'Usuń'
        belt.appendChild(closeButton);
        panel.appendChild(belt);
        panel.appendChild(heading)
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
        panel.classList.add('edit-panel__container');
        infoPanel.classList.add('edit-panel__information');
        actionPanel.classList.add('edit-panel__actions');
        panelWrapper.classList.add('edit-panel__wrapper');
        belt.classList.add('belt');
        closeButton.classList.add('close');
        removeButton.classList.add('remove');
        //Akcje
        panel.addEventListener('mousedown', helpers.dragMouseDown.bind(null, this, panel));
        closeButton.addEventListener('click', (e) => {
            panel.remove();
        })
        removeButton.addEventListener('click', (e) => {
            const user = {
                login: data.user.login
            }
            this.removeUser(user)
        })
        //Łączenie
        belt.appendChild(closeButton)
        actionPanel.appendChild(removeButton)
        panelWrapper.appendChild(infoPanel);
        panelWrapper.appendChild(actionPanel);
        panel.appendChild(panelWrapper)
        container.appendChild(panel)
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
        helpers.changePassword(data).then(res => {
            if (res.status == 200) {
                helpers.showMessage('success', res.message)
                container.remove();
            } else {
                helpers.showMessage('error', res.message)
            }
        })
    }
    removeUser(user) {
        console.log(user)
        helpers.removeUser(user).then(res => {
            if (res.status == 200) {
                helpers.showMessage('success', res.message)
                helpers.showUsers()
                    .then(res => {
                        if (res.status == 200) {
                            this.prepareUsers(res.users);
                            this.createUserTable()
                            this.createRegistrationContainer();
                        }
                    })
            } else {
                helpers.showMessage('error', res.message)
            }
        })
    }
}

export default Users;