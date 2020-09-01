import Users from './users.js'
import Menu from '../Menu/menu.js';
window.onload = function () {
    const users = new Users(),
        menu = new Menu();
    users.getUsers()
    menu.hideMenu();
    menu.showSettings();
}