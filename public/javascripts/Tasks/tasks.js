import tasks from '../helpers/fetch/tasks.js';
import user from '../helpers/fetch/user.js';
import messages from '../helpers/messages.js';
import Movebelt from '../Movebelt/movebelt.js';
import Notification from '../Notifications/notification.js'

class Tasks {
    constructor(mainContainer, todoContainer, inProgressContainer, doneContainer, button) {
        this._containers = {
            _mainContainer: mainContainer,
            _todoContainer: todoContainer,
            _inProgressContainer: inProgressContainer,
            _doneContainer: doneContainer
        }
        this._newTask = {
            _title: null,
            _description: null,
            _tasks: [],
            _status: 'todo',
            _forWho: []
        }
        this._tasks = {
                assignedTasks: [],
                myTasks: []
            },
            this._newWorksButton = button;
        this._newWorksButton.addEventListener('click', this.createTaskWindow.bind(this))
        this.getTasks()
    }
    createTaskContainer(data) {
        const taskContainer = document.createElement('div'),
            taskTitle = document.createElement('h3'),
            taskDescription = document.createElement('p'),
            status = document.createElement('p');

        taskTitle.innerText = data.title;
        taskDescription.innerText = data.description;
        status.innerText = data.status;

        taskContainer.classList.add('task')
        taskContainer.classList.add(`task--${data.status}`)
        taskContainer.setAttribute('draggable', true)
        taskTitle.classList.add('title')
        taskDescription.classList.add('description')
        status.classList.add('status')
        taskContainer.setAttribute('data-id', data._id)
        taskContainer.appendChild(taskTitle)
        taskContainer.appendChild(status)
        taskContainer.appendChild(taskDescription)

        taskContainer.ondragstart = e => {
            e.dataTransfer.setData("class", e.target.classList.value);
            e.dataTransfer.setData("id", e.target.dataset.id)
            e.target.classList.add('drag')
        }



        switch (data.status) {
            case 'todo':
                this._containers._todoContainer.appendChild(taskContainer)
                break;
            case 'in-progress':
                this._containers._inProgressContainer.appendChild(taskContainer)
                break;
            case 'done':
                this._containers._doneContainer.appendChild(taskContainer)
                break;
        }
        taskContainer.addEventListener('dblclick', (e) => {
            const taskWrapper = document.createElement('div'),
                taskContainer = document.createElement('div'),
                title = document.createElement('h1'),
                description = document.createElement('p'),
                status = document.createElement('p'),
                subtasksContainer = document.createElement('div'),
                tasksList = document.createElement('ul'),
                usersContainer = document.createElement('div'),
                usersWhoPerformsTitle = document.createElement('h3'),
                userWhoCreatedTitle = document.createElement('h3'),
                userWhoCreatedContainer = document.createElement('div'),
                usersWhoPerformsContainer = document.createElement('div'),
                usersWhoPerformsList = document.createElement('ul'),
                userWhoCreated = document.createElement('p');
            const minimizedPaneLContainer = document.querySelector('.minimized-panels')
            const movebelt = new Movebelt(null, taskWrapper, minimizedPaneLContainer, data.title)
            movebelt.create()

            taskWrapper.appendChild(taskContainer)
            taskContainer.appendChild(title)
            taskContainer.appendChild(status)
            taskContainer.appendChild(description)
            taskContainer.appendChild(subtasksContainer)
            subtasksContainer.appendChild(tasksList)
            usersWhoPerformsContainer.appendChild(usersWhoPerformsTitle)
            usersWhoPerformsContainer.appendChild(usersWhoPerformsList)
            usersContainer.appendChild(usersWhoPerformsContainer)
            userWhoCreatedContainer.appendChild(userWhoCreatedTitle)
            userWhoCreatedContainer.appendChild(userWhoCreated)
            usersContainer.appendChild(userWhoCreatedContainer)
            taskContainer.appendChild(usersContainer)

            taskWrapper.classList.add('task__wrapper')
            taskContainer.classList.add('task__container')
            usersContainer.classList.add('users__container')
            subtasksContainer.classList.add('sub-tasks__container')
            title.classList.add('title')
            description.classList.add('description')
            status.classList.add('status')
            status.classList.add(`--${data.status}`)
            usersWhoPerformsContainer.classList.add('users-who-performs__container');
            userWhoCreatedContainer.classList.add('user-who-created__container')


            title.innerText = data.title;
            description.innerText = data.description;
            data.tasks.forEach(task => {
                const taskListElement = document.createElement('li'),
                    taskCheckbox = document.createElement('input');
                taskCheckbox.setAttribute('type', 'checkbox')
                taskCheckbox.addEventListener('click', e => {
                    if (e.target.checked) {
                        taskListElement.classList.add('done')
                        task.done = true;
                        tasks.updateSubtask({
                            _id: data._id,
                            tasks: data.tasks
                        })
                    } else {
                        taskListElement.classList.remove('done')
                        task.done = false;
                        tasks.updateSubtask({
                            _id: data._id,
                            tasks: data.tasks
                        })
                    }
                })
                taskListElement.innerText = task.name;
                taskListElement.classList.add('sub-task');
                if (task.done) {
                    taskListElement.classList.add('done')
                    taskCheckbox.setAttribute('checked', true)
                }
                taskListElement.appendChild(taskCheckbox)
                tasksList.appendChild(taskListElement)
            })
            this._tasks.assignedTasks.forEach(task => {
                if (task._id == data._id) {
                    status.innerText = task.status;
                }
            })
            this._tasks.myTasks.forEach(task => {
                if (task._id == data._id) {
                    status.innerText = task.status;
                }
            })
            userWhoCreated.innerText = data.userWhoCreated;
            usersWhoPerformsTitle.innerText = 'Zadanie zlecono:'
            userWhoCreatedTitle.innerText = 'Zadanie zlecił:'
            data.usersWhoPerforms.forEach(user => {
                const listElement = document.createElement('li')
                listElement.innerText = user.name;
                usersWhoPerformsList.appendChild(listElement)
            })
            this._containers._mainContainer.appendChild(taskWrapper)
        })
    }
    getTasks() {
        this._containers._todoContainer.ondrop = e => {
            e.preventDefault();
            let data = e.dataTransfer.getData("class").split(' ').join('.'),
                id = e.dataTransfer.getData('id');
            tasks.updateStatus({
                    status: 'todo',
                    _id: id
                })
                .then(res => {
                    if (res.status == 200) {
                        const task = document.querySelector(`.${data}[data-id="${id}"]`);
                        this._tasks.assignedTasks.forEach(task => {
                            if (task._id == id) {
                                task.status = 'todo'
                            }
                        })
                        this._tasks.myTasks.forEach(task => {
                            if (task._id == id) {
                                task.status = 'todo'
                            }
                        })
                        data.split('.').forEach((cls, index) => {
                            task.classList.remove(cls)
                        })
                        e.target.classList.remove('over')
                        task.classList.add('task')
                        task.classList.add('task--todo')
                        e.target.appendChild(task);
                        task.children[1].innerText = 'todo'

                    } else {
                        messages.showMessage('error', ['Nie udało się zmienić statusu zadania'])
                    }
                })

        }
        this._containers._inProgressContainer.ondrop = e => {
            e.preventDefault();
            let data = e.dataTransfer.getData("class").split(' ').join('.'),
                id = e.dataTransfer.getData('id');


            tasks.updateStatus({
                    status: 'in-progress',
                    _id: id
                })
                .then(res => {
                    if (res.status == 200) {
                        const task = document.querySelector(`.${data}[data-id="${id}"]`);
                        this._tasks.assignedTasks.forEach(task => {
                            if (task._id == id) {
                                task.status = 'in-progress'
                            }
                        })
                        this._tasks.myTasks.forEach(task => {
                            if (task._id == id) {
                                task.status = 'in-progress'
                            }
                        })
                        data.split('.').forEach((cls, index) => {
                            task.classList.remove(cls)
                        })
                        e.target.classList.remove('over')
                        task.classList.add('task')
                        task.classList.add('task--in-progress')
                        e.target.appendChild(task);
                        task.children[1].innerText = 'in-progress'

                    } else {
                        messages.showMessage('error', ['Nie udało się zmienić statusu zadania'])
                    }
                })
        }
        this._containers._doneContainer.ondrop = e => {
            e.preventDefault();
            let data = e.dataTransfer.getData("class").split(' ').join('.'),
                id = e.dataTransfer.getData('id');

            tasks.updateStatus({
                    status: 'done',
                    _id: id
                })
                .then(res => {
                    if (res.status == 200) {
                        const task = document.querySelector(`.${data}[data-id="${id}"]`);
                        this._tasks.assignedTasks.forEach(task => {
                            if (task._id == id) {
                                task.status = 'done'
                            }
                        })
                        this._tasks.myTasks.forEach(task => {
                            if (task._id == id) {
                                task.status = 'done'
                            }
                        })
                        data.split('.').forEach((cls, index) => {
                            task.classList.remove(cls)
                        })
                        e.target.classList.remove('over')
                        task.classList.add('task')
                        task.classList.add('task--done')
                        e.target.appendChild(task);
                        task.children[1].innerText = 'done'
                        e.target.classList.remove('over')
                    } else {
                        messages.showMessage('error', ['Nie udało się zmienić statusu zadania'])
                    }
                })
        }
        this._containers._todoContainer.ondragover = e => {
            e.preventDefault();
            e.target.classList.add('over')
        }
        this._containers._todoContainer.ondragleave = e => {
            e.preventDefault();
            e.target.classList.remove('over')
        }
        this._containers._inProgressContainer.ondragover = e => {
            e.preventDefault();
            e.target.classList.add('over')
        }
        this._containers._inProgressContainer.ondragleave = e => {
            e.preventDefault();
            e.target.classList.remove('over')
        }
        this._containers._doneContainer.ondragover = e => {
            e.preventDefault();
            e.target.classList.add('over')
        }
        this._containers._doneContainer.ondragleave = e => {
            e.preventDefault();
            e.target.classList.remove('over')
        }
        tasks.getAllTasks()
            .then(json => {
                json.assignedTasks.forEach(task => {
                    this.createTaskContainer(task)
                    this._tasks.assignedTasks.push(task)
                })
                json.myTasks.forEach(task => {
                    this.createTaskContainer(task)
                    this._tasks.myTasks.push(task)
                })
            })
    }
    createTaskWindow(e) {
        const wrapper = document.createElement('div'),
            container = document.createElement('div'),
            taskTitleLabel = document.createElement('label'),
            taskTitleInput = document.createElement('input'),
            taskDescriptionLabel = document.createElement('label'),
            taskDescription = document.createElement('textarea'),
            status = document.createElement('p'),
            subtasksContainer = document.createElement('div'),
            tasks = document.createElement('ul'),
            taskListElement = document.createElement('li'),
            taskLabel = document.createElement('label'),
            taskInput = document.createElement('input'),
            removeSubtask = document.createElement('button'),
            addNextTask = document.createElement('button'),
            forWhoSelectArea = document.createElement('textarea'),
            buttonsContainer = document.createElement('div'),
            addButton = document.createElement('button'),
            cancelButton = document.createElement('button');
        const minimizedPaneLContainer = document.querySelector('.minimized-panels')
        const movebelt = new Movebelt(null, wrapper, minimizedPaneLContainer, 'Dodaj zadanie')
        movebelt.create()


        wrapper.classList.add('new-task__wrapper')
        container.classList.add('new-task__container')
        taskTitleInput.classList.add('task-title')
        taskTitleLabel.classList.add('task-title')
        taskDescriptionLabel.classList.add('task-description')
        status.classList.add('task-status')
        subtasksContainer.classList.add('new-sub-tasks__container')
        taskListElement.classList.add('new-task__element')
        addNextTask.classList.add('add-next-task')
        removeSubtask.classList.add('remove-task')
        forWhoSelectArea.classList.add('select-users')
        buttonsContainer.classList.add('buttons__container')
        addButton.classList.add('add')
        cancelButton.classList.add('cancel')
        taskTitleLabel.setAttribute('for', 'task-title')
        taskTitleInput.setAttribute('name', 'task-title')
        taskLabel.setAttribute('for', 'task-specification')
        taskInput.setAttribute('name', 'task-specification')
        addNextTask.setAttribute('value', 'Dodaj')



        addNextTask.addEventListener('click', (e) => {
            const taskListElement = document.createElement('li'),
                taskLabel = document.createElement('label'),
                taskInput = document.createElement('input'),
                removeSubtask = document.createElement('button');

            taskListElement.classList.add('new-task__element')
            removeSubtask.classList.add('remove-task')
            taskLabel.setAttribute('for', 'task-specification')
            taskInput.setAttribute('name', 'task-specification')
            taskLabel.innerText = 'TODO: '
            removeSubtask.innerText = 'X';

            taskInput.addEventListener('change', (e) => {
                if (e.target.dataset.id) {
                    const id = e.target.dataset.id;
                    this._newTask._tasks.forEach(task => {
                        if (task.id == id) {
                            task.name = e.target.value;
                        }
                    })
                } else {
                    const task = {
                        id: createId(),
                        name: e.target.value,
                        done: false,
                        edit: false
                    }
                    removeSubtask.value = task.id;
                    taskListElement.setAttribute('data-id', task.id)
                    e.target.setAttribute('data-id', task.id)
                    this._newTask._tasks.push(task);
                }
            })
            removeSubtask.addEventListener('click', this.removeSubtask.bind(this))
            taskLabel.appendChild(taskInput)
            taskLabel.appendChild(removeSubtask)
            taskListElement.appendChild(taskLabel)
            tasks.appendChild(taskListElement)
        })
        taskTitleInput.addEventListener('change', (e) => {
            this._newTask._title = e.target.value;
        })
        taskDescription.addEventListener('change', (e) => {
            this._newTask._description = e.target.value;
        })
        taskInput.addEventListener('change', (e) => {
            if (e.target.dataset.id) {
                const id = e.target.dataset.id;
                this._newTask._tasks.forEach(task => {
                    if (task.id == id) {
                        task.name = e.target.value;
                    }
                })
            } else {
                const task = {
                    id: createId(),
                    name: e.target.value,
                    done: false,
                    edit: false
                }
                removeSubtask.value = task.id;
                e.target.setAttribute('data-id', task.id)
                taskListElement.setAttribute('data-id', task.id)
                this._newTask._tasks.push(task);
            }

        })
        removeSubtask.addEventListener('click', this.removeSubtask.bind(this))
        forWhoSelectArea.addEventListener('keydown', (e) => {
            if (e.target.value.length >= 3) {
                const isExist = document.querySelector('.available-users')
                user.showUsers({
                        user: e.target.value
                    })
                    .then(res => {
                        if (res.status == 200) {
                            if (isExist) {
                                isExist.remove();
                                this.listUsers(res.users, subtasksContainer)
                            } else {
                                this.listUsers(res.users, subtasksContainer)
                            }

                        }
                    })
            } else {
                const isExist = document.querySelector('.available-users')
                if (isExist) {
                    isExist.remove()
                }
            }
        })
        addButton.addEventListener('click', this.createNewTask.bind(this))
        cancelButton.addEventListener('click', e => {
            wrapper.remove()
        })

        taskTitleLabel.innerText = 'Tytuł zadania'
        taskDescriptionLabel.innerText = 'Opis zadania'
        taskLabel.innerText = 'TODO: '
        status.innerText = 'Nowy'
        addNextTask.innerText = 'Dodaj'
        removeSubtask.innerText = 'X'
        addButton.innerText = 'Dodaj'
        cancelButton.innerText = 'Anuluj'


        wrapper.appendChild(container)
        taskTitleLabel.appendChild(taskTitleInput)
        taskDescriptionLabel.appendChild(taskDescription)
        subtasksContainer.appendChild(tasks)
        subtasksContainer.appendChild(addNextTask)
        tasks.appendChild(taskListElement)
        taskLabel.appendChild(taskInput)
        taskLabel.appendChild(removeSubtask)
        taskListElement.appendChild(taskLabel)
        container.appendChild(status)
        container.appendChild(taskTitleLabel)
        container.appendChild(taskDescriptionLabel)

        container.appendChild(subtasksContainer)
        container.appendChild(forWhoSelectArea)
        buttonsContainer.appendChild(addButton)
        buttonsContainer.appendChild(cancelButton)
        container.appendChild(buttonsContainer)
        this._containers._mainContainer.appendChild(wrapper)

    }
    createNewTask() {
        tasks.createTask(this._newTask)
            .then(json => {
                if (json.status == 200) {
                    messages.showMessage('success', json.message)
                    // const notification = new Notification()
                    // notification.sendMessage('addTask', json.task)
                }
            })
    }
    removeSubtask(e) {
        const id = e.target.value,
            listElement = document.querySelector(`.new-task__element[data-id="${id}"]`);

        this._newTask._tasks = this._newTask._tasks
            .filter(task => {
                if (task.id != id) {
                    return task
                }
            })
        if (listElement) {
            listElement.remove()
        }

    }
    listUsers(users, subtasksContainer) {
        const usersContainer = document.createElement('div'),
            usersList = document.createElement('ul');

        usersContainer.classList.add('available-users')

        subtasksContainer.appendChild(usersContainer)
        usersContainer.appendChild(usersList)
        users.forEach(user => {
            const userListElement = document.createElement('li'),
                checkbox = document.createElement('input')

            checkbox.setAttribute('type', 'checkbox')
            checkbox.setAttribute('data-id', user._id)
            userListElement.innerText = user.login
            userListElement.appendChild(checkbox)
            usersList.appendChild(userListElement)
            checkbox.addEventListener('click', (e) => {
                const id = e.target.dataset.id,
                    isChecked = e.target.checked;
                if (isChecked) {
                    this._newTask._forWho.push({
                        taskID: id,
                        userID: user._id,
                        name: user.login
                    })
                } else {
                    this._newTask._forWho = this._newTask._forWho
                        .filter(user => {
                            if (user.id != id) {
                                return user
                            }
                        })

                }
            })
        })
    }
}

const createId = () => {
    let id = '';
    for (let i = 0; i < 10; i++) {
        id += Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return id;
}
export default Tasks