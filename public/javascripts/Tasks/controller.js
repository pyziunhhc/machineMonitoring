import Tasks from './tasks.js'
window.onload = () => {
    const newWorkButton = document.querySelector('button.new'),
        mainContainer = document.querySelector('.main-tasks__container'),
        todoTasksContainer = document.querySelector('.tasks__container.tasks--todo > .tasks'),
        inProgressTasksContainer = document.querySelector('.tasks__container.tasks--in-progress > .tasks'),
        doneTasksContainer = document.querySelector('.tasks__container.tasks--done > .tasks');

    const tasks = new Tasks(mainContainer, todoTasksContainer, inProgressTasksContainer, doneTasksContainer, newWorkButton);
}