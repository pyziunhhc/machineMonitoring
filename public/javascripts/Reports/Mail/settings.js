import emailUsers from '../../helpers/fetch/reports.js';

class MailReport {
    constructor(availableContainer, addedContainer) {
        this._containers = {
            availableContainer,
            addedContainer
        };
        this._users = null;
    }
    getUsers() {
        return emailUsers.showUsers()
            .then(users => {
                this._users = {
                    available: users.data.available,
                    daily: users.data.daily,
                    monthly: users.data.monthly
                }
            })
    }
    createDOM() {
        this.getUsers()
            .then(() => {
                this._containers.availableContainer.forEach((container, index) => {
                    this._users.available.forEach(user => {
                        if (index == 0) {
                            if (!user.daily) {
                                const login = document.createElement('p'),
                                    email = document.createElement('p'),
                                    input = document.createElement('input'),
                                    userContainer = document.createElement('div');
                                login.innerText = user.user;
                                email.innerText = user.email;

                                input.setAttribute('type', 'checkbox')
                                input.setAttribute('value', user._id)

                                input.addEventListener('click', e => {
                                    this._users.daily.push(user);
                                    this._users.available = this._users.available
                                        .filter(available => {
                                            return user.user != available.user;
                                        })
                                    emailUsers.addUser({
                                            user: user,
                                            daily: true,
                                            monthly: user.monthly
                                        })
                                        .then(res => {

                                        })
                                    this._containers.addedContainer[index].appendChild(e.target.parentElement);
                                })
                                userContainer.appendChild(login);
                                userContainer.appendChild(email);
                                userContainer.appendChild(input);
                                container.appendChild(userContainer)
                            }
                        }
                        if (index == 1) {
                            if (!user.monthly) {
                                const login = document.createElement('p'),
                                    email = document.createElement('p'),
                                    input = document.createElement('input'),
                                    userContainer = document.createElement('div');
                                login.innerText = user.user;
                                email.innerText = user.email;

                                input.setAttribute('type', 'checkbox')
                                input.setAttribute('value', user._id)
                                input.addEventListener('click', e => {

                                    this._users.monthly.push(user);
                                    this._users.available = this._users.available
                                        .filter(available => {
                                            return user.user != available.user;
                                        })
                                    emailUsers.addUser({
                                            user: user,
                                            monthly: true,
                                            daily: user.daily
                                        })
                                        .then(res => {

                                        })
                                    this._containers.addedContainer[index].appendChild(e.target.parentElement);
                                })

                                userContainer.appendChild(login);
                                userContainer.appendChild(email);
                                userContainer.appendChild(input);
                                container.appendChild(userContainer)
                            }
                        }


                    })
                });
                this._containers.addedContainer.forEach((container, index) => {
                    if (this._users.daily.length) {
                        this._users.daily.forEach(user => {
                            if (index == 0) {
                                if (user.daily) {
                                    const login = document.createElement('p'),
                                        email = document.createElement('p'),
                                        input = document.createElement('input'),
                                        userContainer = document.createElement('div');
                                    login.innerText = user.user;
                                    email.innerText = user.email;

                                    input.setAttribute('type', 'checkbox')
                                    input.setAttribute('value', user._id)
                                    input.addEventListener('click', e => {
                                        this._users.available.push(user);
                                        this._users.daily = this._users.daily
                                            .filter(daily => {
                                                return user.user != daily.user;
                                            })
                                        emailUsers.addUser({
                                                user: user,
                                                monthly: user.monthly,
                                                daily: false
                                            })
                                            .then(res => {

                                            })
                                        this._containers.availableContainer[index].appendChild(e.target.parentElement);
                                    })
                                    userContainer.appendChild(login);
                                    userContainer.appendChild(email);
                                    userContainer.appendChild(input);
                                    container.appendChild(userContainer)
                                }
                            }
                        })
                    }
                    if (this._users.monthly.length) {
                        this._users.monthly.forEach(user => {
                            if (index == 1) {
                                if (user.monthly) {
                                    const login = document.createElement('p'),
                                        email = document.createElement('p'),
                                        input = document.createElement('input'),
                                        userContainer = document.createElement('div');
                                    login.innerText = user.user;
                                    email.innerText = user.email;

                                    input.setAttribute('type', 'checkbox')
                                    input.setAttribute('value', user._id)

                                    input.addEventListener('click', e => {
                                        this._users.available.push(user);
                                        this._users.monthly = this._users.monthly
                                            .filter(monthly => {
                                                return user.user != monthly.user;
                                            })
                                        emailUsers.addUser({
                                                user: user,
                                                monthly: false,
                                                daily: user.daily
                                            })
                                            .then(res => {

                                            })
                                        this._containers.availableContainer[index].appendChild(e.target.parentElement);
                                    })

                                    userContainer.appendChild(login);
                                    userContainer.appendChild(email);
                                    userContainer.appendChild(input);
                                    container.appendChild(userContainer)
                                }
                            }
                        })
                    }



                })
            })

        //console.log(this._containers, this._users)
    }
}

export default MailReport;