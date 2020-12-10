import React, { Component } from "react";
import "./style.css";
export default class AddTaskWindow extends Component {
  constructor() {
    super();
    this.state = {
      taskDescription: "",
    };
    this.descriptionInput = React.createRef();
    this.descriptionLabel = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      taskDescription: e.currentTarget.value,
    });
  }
  render() {
    return (
      <div className="subtasks__container">
        <div className="subtask__container">
          <label htmlFor="subtask" ref={this.descriptionLabel}>
            Dodaj podzadanie:
          </label>
          <div>
            <input
              type="text"
              onChange={this.handleChange}
              ref={this.descriptionInput}
            />
            <button
              type="button"
              onClick={() => {
                this.setState({ taskDescription: "" });
                this.props.addNewSubtask(this.state.taskDescription);
                this.descriptionInput.current.value = "";
              }}>
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}
