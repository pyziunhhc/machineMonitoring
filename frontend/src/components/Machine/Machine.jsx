import { Component } from "react";
import './style.css';
export default class Machine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      shortName: this.props.name.split("_")[0].slice(0, 3),
      status: "",
      class: "",
      intervalID: 0
    };
    this.getStatus = this.getStatus.bind(this);
  }
  getStatus() {
    const body = {
      name: this.state.name,
      from: new Date(),
      to: new Date(),
    };
    fetch("http://localhost:3001/data/get/status", {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.status !== this.state.status){
          this.setState((prevState) => {
            return {
              ...prevState,
              status: data.status,
              class: data.class
            };
          });
        }

      });
  }
  componentDidMount() {
    // const intervalID = setInterval(this.getStatus, 1000);
    // this.setState(prevState=>{
    //   return {
    //     ...prevState,
    //     intervalID
    //   }
    // })
  }
  componentWillUnmount(){
    clearInterval(this.state.intervalID)
  }
  render() {
    return (
      <div className="machine" onClick={() => {
        this.props.createWindowMachine(this.state.name);
        clearInterval(this.state.intervalID)
      }}>
        <img
          src={`machines/${this.state.shortName}.png`}
          alt="machine"
        />
        <p className="machine-name">{this.state.name}</p>
        <p className={`status ${this.state.class}`}>{this.state.status !== "" ? this.state.status : 'ŁADOWANIE...'}</p>
      </div>
    );
  }
}
