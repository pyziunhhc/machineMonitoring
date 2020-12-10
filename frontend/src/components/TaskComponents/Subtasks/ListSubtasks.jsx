import React, { Component } from "react";
import './style.css'
export default class ListSubtasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      done: this.props.done,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState((prevState) => {
      return {
        ...prevState,
        done: !this.state.done,
      };
    });
  }
  render() {
    return (
      <div>
        <label className={`task${this.state.done ? "--done" : ""}`}>
          {this.state.description}
          <input type="checkbox" onChange={this.handleChange} />
        </label>
      </div>
    );
  }
}
