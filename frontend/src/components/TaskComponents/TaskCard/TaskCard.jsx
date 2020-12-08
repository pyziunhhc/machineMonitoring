import React, { Fragment, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import TaskWindow from "../TaskWindow/TaskWindow";

import "./style.css";
export default class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      title: this.props.title,
      tasks: this.props.tasks,
      usersWhoPerforms: this.props.usersWhoPerforms,
      usersWhoCreated: this.props.usersWhoCreated,
      showDetails: false,
    };
    this.createTaskDetailsWindow = this.createTaskDetailsWindow.bind(this);
    this.removeWindow = this.removeWindow.bind(this);
  }
  createTaskDetailsWindow() {
    this.setState((prevState) => {
      return {
        ...prevState,
        showDetails: !this.state.showDetails,
      };
    });
  }
  removeWindow() {
    this.setState((prevState) => {
      return {
        ...prevState,
        showDetails: !this.state.showDetails,
      };
    });
  }
  render() {
    return (
      <Fragment>
        <div
          className="task__container"
          onDoubleClick={this.createTaskDetailsWindow}>
          <div className={`task --${this.state.status}`}>
            <div className="title">
              <h1>{this.state.title}</h1>
            </div>
            <div className="description">
              <p>{this.state.description}</p>
            </div>
            <div className="users">
              <FontAwesomeIcon icon={faUser} size="lg" />
              <ul>
                {this.state.usersWhoPerforms.map((user) => (
                  <li>{user.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {this.state.showDetails ? (
          <TaskWindow
            title={this.state.title}
            description={this.state.description}
            tasks={this.state.tasks}
            usersWhoCreated={this.state.usersWhoCreated}
            usersWhoPerforms={this.state.usersWhoPerforms}
            removeWindow={this.removeWindow}
          />
        ) : null}
      </Fragment>
    );
  }
}
