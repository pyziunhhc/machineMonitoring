import React from "react";
import "./style.css";
import Machine from "../Machine/Machine";
import MachineWindow from "../MonitoringWindow/MachineWindow";
class Monitoring extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: [],
      showMachine: {
        name: "",
        show: false,
      },
    };
    this.createWindowMachine = this.createWindowMachine.bind(this);
    this.removeMachineWindow = this.removeMachineWindow.bind(this);
  }
  componentDidMount() {
    this.props.setActivePage("Monitoring");
    this.getMachines();
  }
  getMachines() {
    fetch("http://localhost:3001/machines/get", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const machinesArray = [];
        res.machines.forEach((element) => {
          machinesArray.push({ name: element.name, type: element.type });
        });
        this.setState({
          machines: machinesArray,
        });
      });
  }

  createWindowMachine(name) {
    this.setState((prevState) => {
      return {
        ...prevState,
        showMachine: {
          name: name,
          show: !this.state.showMachine.show,
        },
      };
    });
  }
  removeMachineWindow() {
    this.setState((prevState) => {
      return {
        ...prevState,
        showMachine: {
          name: "",
          show: !this.state.showMachine.show,
        },
      };
    });
  }
  getIntervals(){

  }
  render() {
    return (
      <div className="machines__container">
        <div className="machine-type__container">
          <h1>
            Produkcja
            <br />
            Erodowanie
          </h1>
          {this.state.machines.map((machine) => {
            if (machine.type === "Produkcja-Erodowanie") {
              return (
                <Machine
                  name={machine.name}
                  key={machine.name}
                  createWindowMachine={this.createWindowMachine}
                />
              );
            }
            return true;
          })}
        </div>
        <div className="machine-type__container">
          <h1>
            Ostrzenie
            <br />
            VHM
          </h1>
          {this.state.machines.map((machine) => {
            if (machine.type === "Ostrzenie-VHM") {
              return (
                <Machine
                  name={machine.name}
                  key={machine.name}
                  createWindowMachine={this.createWindowMachine}
                />
              );
            }
            return true;
          })}
        </div>
        <div className="machine-type__container">
          <h1>
            Ostrzenie
            <br />
            Erodowanie
          </h1>
          {this.state.machines.map((machine) => {
            if (machine.type === "Ostrzenie-Erodowanie") {
              return (
                <Machine
                  name={machine.name}
                  key={machine.name}
                  createWindowMachine={this.createWindowMachine}
                />
              );
            }
            return true;
          })}
        </div>
        <div className="machine-type__container">
          <h1>
            Ostrzenie <br /> Wiertła VHM
          </h1>
          {this.state.machines.map((machine) => {
            if (machine.type === "Ostrzenie-Wiertła VHM") {
              return (
                <Machine
                  name={machine.name}
                  key={machine.name}
                  createWindowMachine={this.createWindowMachine}
                />
              );
            }
            return true;
          })}
        </div>
        <div className="machine-type__container">
          <h1>
            Produkcja
            <br />
            Korpusy
          </h1>
          {this.state.machines.map((machine) => {
            if (machine.type === "Produkcja-Korpusy") {
              return (
                <Machine
                  name={machine.name}
                  key={machine.name}
                  createWindowMachine={this.createWindowMachine}
                />
              );
            }
            return true;
          })}
        </div>
        {this.state.showMachine.show ? (
          <MachineWindow name={this.state.showMachine.name} removeMachineWindow={this.removeMachineWindow} />
        ) : null}
      </div>
    );
  }
}

export default Monitoring;
