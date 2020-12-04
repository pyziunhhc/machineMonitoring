import { Component } from "react";

export default class Machine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      shortName: this.props.name.split("_")[0].slice(0, 3),
    };
  }

  render() {
    return (
      <div className="machine">
        <img src={`machines/${this.state.shortName}.png`} alt="machine" onClick={() => {
            this.props.createWindowMachine(this.state.name);
          }}/>
        <p className="machine-name">{this.state.name}</p>
      </div>
    );
  }
}
