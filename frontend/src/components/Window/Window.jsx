import React, { Component } from "react";

export default class Window extends Component {
  render() {
    return (
      <div className="window__wrapper">
          <div className="belt">

          </div>
        <h1>{`${this.state.name}`}</h1>
        <div className="window__container">

        </div>
      </div>
    );
  }
}
