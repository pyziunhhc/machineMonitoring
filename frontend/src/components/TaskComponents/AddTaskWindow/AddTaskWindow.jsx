import React, { Component } from "react";
import Belt from "../../Belt/Belt";
import Subtasks from "../Subtasks/AddSubtask";
export default class AddTaskWindow extends Component {
  constructor() {
    super();
    this.container = {
      ref: React.createRef(),
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
      mouseDown: false,
    };
    this.users = {
      ref: React.createRef(),
    };
    this.state = {
      taskTitle: "",
      taskDescription: "",
      subtasks: [],
      taskUsers: [],
      tempUsers: [],
    };

    this.addTask = this.addTask.bind(this);
    this.addNewSubtask = this.addNewSubtask.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addUser = this.addUser.bind(this);
  }
  addTask() {
    const data = {
      _title: this.state.taskTitle,
      _description: this.state.taskDescription,
      _status: "todo",
      _tasks: this.state.subtasks,
      usersWhoPerforms: this.state.taskUsers,
    };
    fetch("http://localhost:3001/tasks/add", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          this.props.addTaskToList(res.task);
        }
      });
  }
  addUser(user) {
    this.setState((prevState) => {
      return { ...prevState, taskUsers: [...prevState.taskUsers, user] };
    });
  }
  addNewSubtask(subTask) {
    if (subTask) {
      this.setState((prevState) => {
        let array = [
          ...prevState.subtasks,
          { name: subTask, done: false, edit: false },
        ];
        return { ...prevState, subtasks: array };



      });
    } else {
      alert("PUSTE?!");
    }
  }
  handleInputChange(e) {
    const type = e.currentTarget.name,
      value = e.currentTarget.value;
    switch (type) {
      case "task-title":
        this.setState((prevState) => {
          return { ...prevState, taskTitle: value };
        });
        break;
      case "task-description":
        this.setState((prevState) => {
          return { ...prevState, taskDescription: value };
        });
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div className="add-task__wrapper" ref={this.container.ref}>
        <Belt container={this.container} title="Dodaj nowe zadanie" />
        <div className="add-task__container">
          <div className="inputs">
            <label htmlFor="task-title">Tytuł:</label>
            <input
              type="text"
              name="task-title"
              onChange={this.handleInputChange}
            />
            <label htmlFor="task-description">Opis:</label>
            <textarea
              name="task-description"
              onChange={this.handleInputChange}
            />
          </div>
          <Subtasks addNewSubtask={this.addNewSubtask} />
          <div className="added-subtasks__container">
            <ul>
              {this.state.subtasks.map((subtask) => (
                <li>{subtask.name}</li>
              ))}
            </ul>
          </div>
          <Users addUser={this.addUser} />
          <div className="actions">
            <button
              className="add"
              onClick={() => {
                this.addTask();
                this.container.ref.current.remove()
              }}>
              Dodaj
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class User extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  render() {
    return (
      <li
        ref={this.ref}
        onClick={() => {
          this.props.addUser(this.props.name);
          this.ref.current.remove();
        }}>
        {this.props.name}
      </li>
    );
  }
}
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempUsers: [],
      addedUsers: [],
    };
    this.getUsers = this.getUsers.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async getUsers(data) {
    const response = await fetch("http://localhost:3001/users/list", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  handleInputChange(e) {
    const value = e.currentTarget.value;
    if (value.length >= 2) {
      this.getUsers({ user: value }).then((res) => {
        if (res.status === 200) {
          let tempUsers = [],
            addedUsers = [];
          res.users.forEach((element) => {
            tempUsers.push(
              <User
                name={`${element.name} ${element.surname}`}
                addUser={this.props.addUser}
              />
            );
            addedUsers.push(element.login);
          });
          this.setState((prevState) => {
            return {
              ...prevState,
              tempUsers: tempUsers,
              addedUsers: addedUsers,
            };
          });
        }
      });
    }
  }
  render() {
    return (
      <div className="task-users__container">
        <label htmlFor="for-who">Dla kogo:</label>
        <textarea
          name="for-who"
          //value={this.state.addedUsers.map((user) => user)}
          onChange={this.handleInputChange}></textarea>
        <div className="available-users">
          <ul>{this.state.tempUsers.map((user) => user)}</ul>
        </div>
      </div>
    );
  }
}
