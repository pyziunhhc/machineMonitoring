import React, { Component } from "react";
import "./style.css";
import Belt from "../../Belt/Belt";
import Subtask from "../Subtasks/ListSubtasks";
export default class TaskWindow extends Component {
  constructor(props) {
    super(props);
    this.container = {
      ref: React.createRef(),
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
      mouseDown: false,
    };
    this.state = {
      title: this.props.title,
      description: this.props.description,
      tasks: this.props.tasks,
      usersWhoPerforms: this.props.usersWhoPerforms,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    console.log(e.target.checked);
  }
  render() {
    return (
      <div className="task-window__wrapper" ref={this.container.ref}>
        <Belt
          title={this.state.title}
          container={this.container}
          removeWindow={this.props.removeWindow}
        />
        <div className="task__container">
          <div className="forWho">
            <label>
              Dla kogo:
              <ul>
                {this.state.usersWhoPerforms.map((user) => (
                  <li>{user.name}</li>
                ))}
              </ul>
            </label>
          </div>
          <div className="description">
            <label htmlFor="description">
              Opis zadania:
              <p name="description" className="description">
                {this.state.description}
              </p>
            </label>
          </div>
          <div className="subtasks">
              <p>Podzadania:</p>
            {this.state.tasks.map((task) => {

              return (
                <Subtask
                  description={task.name}
                  done={task.done}
                  id={task.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
