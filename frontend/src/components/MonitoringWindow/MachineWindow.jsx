/**TODO:
 * - wymyśleć w jaki sposób w zależności od maszyny i statusu ustawiać zdjęcie
 */

import { Component } from "react";
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
    };
  }
  async getDataForMachine(name) {
    const body = {
      name,
      from: new Date(new Date() - 86400000),
      to: new Date(),
    };
    await fetch("http://localhost:3001/data/get/all", {
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
  componentDidMount() {
    this.getDataForMachine(this.state.name);
  }
  render() {
    return (
      <div className="machine__wrapper">
        <h1>{`${this.state.name}`}</h1>
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
            <div ref="chart" className="dygraph__container">
              {/* <Dygraph data={this.state.data.dygraph}/> */}
            </div>
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
