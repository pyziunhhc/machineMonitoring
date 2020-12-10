import React, { Component, Fragment } from "react";
import TaskCard from "../TaskCard/TaskCard";
import AddTaskWindow from "../AddTaskWindow/AddTaskWindow";
import "./style.css";
export default class TasksList extends Component {
  constructor() {
    super();
    this.state = {
      todo: [],
      inProgress: [],
      done: [],
      showDetails: false,
      showRegisterWindow: false,
    };
    this.getTasks = this.getTasks.bind(this);
    this.addTaskToList = this.addTaskToList.bind(this);
    this.showRegisterWindow = this.showRegisterWindow.bind(this);
  }
  getTasks() {
    fetch("http://localhost:3001/tasks/all/list", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((tasks) => {
        if (tasks.status === 200) {
          tasks.assignedTasks.forEach((task) => {
            switch (task.status) {
              case "todo":
                this.setState((prevState) => {
                  let array = [...prevState.todo];
                  array.push(
                    <TaskCard
                      id={task._id}
                      tasks={task.tasks}
                      color={task.color}
                      status={task.status}
                      description={task.description}
                      title={task.title}
                      usersWhoPerforms={task.usersWhoPerforms}
                      userWhoCreated={task.userWhoCreated}
                      showDetails={this.createTaskDetailsWindow}
                    />
                  );
                  return {
                    ...prevState,
                    todo: array,
                  };
                });
                break;
              case "inProgress":
                this.setState((prevState) => {
                  let array = [...prevState.inProgress];
                  array.push(
                    <TaskCard
                      id={task._id}
                      tasks={task.tasks}
                      color={task.color}
                      status={task.status}
                      description={task.description}
                      title={task.title}
                      usersWhoPerforms={task.usersWhoPerforms}
                      userWhoCreated={task.userWhoCreated}
                      showDetails={this.createTaskDetailsWindow}
                    />
                  );
                  return {
                    ...prevState,
                    inProgress: array,
                  };
                });
                break;
              case "done":
                this.setState((prevState) => {
                  let array = [...prevState.done];
                  array.push(
                    <TaskCard
                      id={task._id}
                      tasks={task.tasks}
                      color={task.color}
                      description={task.description}
                      title={task.title}
                      usersWhoPerforms={task.usersWhoPerforms}
                      userWhoCreated={task.userWhoCreated}
                      showDetails={this.createTaskDetailsWindow}
                      status={task.status}
                    />
                  );
                  return {
                    ...prevState,
                    done: array,
                  };
                });
                break;
              default:
                break;
            }
          });
          tasks.myTasks.forEach((task) => {
            switch (task.status) {
              case "todo":
                this.setState((prevState) => {
                  let array = [...prevState.todo];
                  array.push(
                    <TaskCard
                      tasks={task.tasks}
                      color={task.color}
                      description={task.description}
                      title={task.title}
                      usersWhoPerforms={task.usersWhoPerforms}
                      userWhoCreated={task.userWhoCreated}
                      showDetails={this.createTaskDetailsWindow}
                      status={task.status}
                    />
                  );
                  return {
                    ...prevState,
                    todo: array,
                  };
                });
                break;
              case "inProgress":
                this.setState((prevState) => {
                  let array = [...prevState.inProgress];
                  array.push(
                    <TaskCard
                      tasks={task.tasks}
                      color={task.color}
                      description={task.description}
                      title={task.title}
                      usersWhoPerforms={task.usersWhoPerforms}
                      userWhoCreated={task.userWhoCreated}
                      showDetails={this.createTaskDetailsWindow}
                      status={task.status}
                    />
                  );
                  return {
                    ...prevState,
                    inProgress: array,
                  };
                });
                break;
              case "done":
                this.setState((prevState) => {
                  let array = [...prevState.done];
                  array.push(
                    <TaskCard
                      tasks={task.tasks}
                      color={task.color}
                      description={task.description}
                      title={task.title}
                      usersWhoPerforms={task.usersWhoPerforms}
                      userWhoCreated={task.userWhoCreated}
                      showDetails={this.createTaskDetailsWindow}
                      status={task.status}
                    />
                  );
                  return {
                    ...prevState,
                    done: array,
                  };
                });
                break;
              default:
                break;
            }
          });
        }
      });
  }
  addTaskToList(task) {
    this.setState((prevState) => {
      return {
        ...prevState,
        todo: [
          ...prevState.todo,
          <TaskCard
            tasks={task.tasks}
            color={task.color}
            description={task.description}
            title={task.title}
            usersWhoPerforms={task.usersWhoPerforms}
            userWhoCreated={task.userWhoCreated}
            showDetails={this.createTaskDetailsWindow}
            status={task.status}
          />,
        ],
      };
    });
  }
  showRegisterWindow() {
    this.setState((prevState) => {
      return {
        ...prevState,
        showRegisterWindow: !this.state.showRegisterWindow,
      };
    });
  }
  componentDidMount() {
    this.getTasks();
  }
  render() {
    return (
      <Fragment>
        {this.state.showRegisterWindow ? (
          <AddTaskWindow addTaskToList={this.addTaskToList} />
        ) : null}
        <div className="tasks__wrapper">
          <div className="belt">
            <div className="actions">
              <button className="add" onClick={this.showRegisterWindow}>
                +
              </button>
            </div>
          </div>
          <div className="tasks__container">
            <div className="tasks-type__container">
              <div className="counter --todo">{this.state.todo.length}</div>
              <div
                className="tasks"
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("id"),
                    status = e.dataTransfer.getData("status");
                  let movedTask = null;
                  let array = this.state[status].filter((task) => {
                    if (task.props.id !== id) {
                      return task;
                    } else {
                      movedTask = task;
                    }
                  });
                  /**TODO
                   * Dodać przesuwanie się zadań między tablicami
                   * Dodać zmianę statusu w bazie danych
                   */
                  switch (status) {
                    case "todo":
                      this.setState((prevState) => {
                        return {
                          ...prevState,
                          todo: [...prevState, movedTask],
                        };
                      });
                      break;
                    case "inProgress":
                      this.setState((prevState) => {
                        return {
                          ...prevState,
                          inProgress: array,
                        };
                      });
                      break;
                    case "done":
                      this.setState((prevState) => {
                        return {
                          ...prevState,
                          done: array,
                        };
                      });
                      break;
                    default:
                      break;
                  }
                }}
                onDragOver={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}>
                {this.state.todo.map((task) => task)}
              </div>
              <div className="status --todo">Do zrobienia</div>
            </div>
            <div className="tasks-type__container">
              <div className="counter --in-progress">
                {this.state.inProgress.length}
              </div>
              <div
                className="tasks"
                onDrop={(e) => {
                  console.log(e);
                }}>
                {this.state.inProgress.map((task) => task)}
              </div>
              <div className="status --in-progress">W trakcie realizacji</div>
            </div>
            <div className="tasks-type__container">
              <div className="counter --done">{this.state.done.length}</div>
              <div className="tasks">{this.state.done.map((task) => task)}</div>
              <div className="status --done">Załatwione</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
