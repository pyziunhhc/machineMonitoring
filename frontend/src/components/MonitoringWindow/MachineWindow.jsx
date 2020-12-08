/**TODO:
 * - wymyśleć w jaki sposób w zależności od maszyny i statusu ustawiać zdjęcie
 */

import React, { Component } from "react";
import Table from "../Table/Table";
import Chart from "../ChartJS/Chart";
import Dygraph from "../Dygraph/Dygraph";
import "./style.css";
export default class MachineWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      shortName: this.props.name.split("_")[0].slice(0, 3),
      data: {
        summary: "",
        chartJS: "",
        dygraph: "",
      },
      lastStatus: "",
      intervalID: 0,
    };
    this.window = {
      ref: React.createRef(),
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
      mouseDown: false,
    };
    this.getDataForMachine = this.getDataForMachine.bind(this);
    this.saveData = this.saveData.bind(this);
    this.saveData();
  }
  async getDataForMachine(name) {
    const body = {
      name,
      from: new Date(new Date() - 86400000),
      to: new Date(),
    };
    const resp = await fetch("http://localhost:3001/data/get/all", {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
    });
    return resp.json();
  }
  async updateDataForMachine(name) {
    const body = {
      name,
      from: new Date(new Date() - 86400000),
      to: new Date(),
      oldData: {
        summary: this.state.data.summary,
        dygraph: this.state.data.dygraph,
      },
      lastStatus: this.state.lastStatus,
    };
    await fetch("http://localhost:3001/data/update/all", {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let percentage = res.chartJS.percentage.map((element) => {
            return parseFloat(element);
          }),
          time = res.chartJS.time.map((element) => {
            return new Date(element).getTime();
          }),
          labels = res.chartJS.labels,
          colors = res.chartJS.colors,
          dygraph = res.dygraph.map((element) => {
            return element.map((data, index) => {
              if (index === 0) {
                return new Date(data);
              } else {
                return data;
              }
            });
          });
        this.setState((prevState) => {
          return {
            ...prevState,
            data: {
              summary: res.summary,
              chartJS: { labels, colors, percentage, time },
              dygraph: dygraph,
            },
            lastStatus: res.status,
          };
        });
      });
  }
  async saveData() {
    await Promise.all([this.getDataForMachine(this.state.name)]).then(
      (data) => {
        const res = data[0];
        let percentage = res.chartJS.percentage.map((element) => {
            return parseFloat(element);
          }),
          time = res.chartJS.time.map((element) => {
            return new Date(element).getTime();
          }),
          labels = res.chartJS.labels,
          colors = res.chartJS.colors,
          dygraph = res.dygraph.map((element) => {
            return element.map((data, index) => {
              if (index === 0) {
                return new Date(data);
              } else {
                return data;
              }
            });
          });
        this.dygraph = <Dygraph data={dygraph} />;
        this.setState((prevState) => {
          return {
            ...prevState,
            data: {
              summary: res.summary,
              chartJS: { labels, colors, percentage, time },
              dygraph: dygraph,
            },
            lastStatus: res.status,
          };
        });
      }
    );
  }
  componentDidMount() {
    const ID = setInterval(() => {
      this.updateDataForMachine(this.state.name);
    }, 1000);
    this.setState((prevState) => {
      return {
        ...prevState,
        intervalID: ID,
      };
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }
  render() {
    return (
      <div className="machine__wrapper" ref={this.window.ref}>
        <div
          className="belt"
          onMouseDown={(e) => {
            this.window.mouseDown = true;
            this.window.pos1 = 0;
            this.window.pos2 = 0;
            this.window.pos3 = e.clientX;
            this.window.pos4 = e.clientY;
          }}
          onMouseUp={() => {
            this.window.mouseDown = false;
          }}
          onMouseMove={(e) => {
            if (this.window.mouseDown) {
              e.stopPropagation();
              this.window.pos1 = this.window.pos3 - e.clientX;
              this.window.pos2 = this.window.pos4 - e.clientY;
              this.window.pos3 = e.clientX;
              this.window.pos4 = e.clientY;
              this.window.ref.current.style.top = `${this.window.ref.current.offsetTop - this.window.pos2}px`;
              this.window.ref.current.style.left = `${this.window.ref.current.offsetLeft - this.window.pos1}px`;
            }
          }}>
          <h1>{`${this.state.name}`}</h1>
          <div className="actions">
            <button>_</button>
            <button onClick={this.props.removeMachineWindow}>X</button>
          </div>
        </div>

        <div className="machine__container">
          <div className="left-panel__container">
            <div className="status__container">
              <img
                src={`./machines/${this.state.shortName}.png`}
                alt="machine"
              />
              <h1>{this.state.lastStatus}</h1>
            </div>
            <div className="table__container">
              {<Table data={this.state.data.summary} />}
            </div>
          </div>
          <div className="middle-panel__container">
            <div className="dygraph__container">{this.dygraph}</div>
            <div className="chartJS__container">
              <Chart type="percentage" data={this.state.data.chartJS} />
              <Chart type="time" data={this.state.data.chartJS} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
