import Users from './users.js';
window.onload = function () {
    const users = new Users();
    users.getUsers()
}