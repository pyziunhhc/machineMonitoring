import React from "react";
import "./style.css";
import logo from "./logo.png";
import Notification from "../Notification/Notifications";
export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      showMessage: false,
      message: "",
    };
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLoginInput = this.handleLoginInput.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }
  handleLoginInput(e) {
    if (e.currentTarget.value !== "") {
      this.setState({
        login: e.currentTarget.value,
      });
    }
  }
  handlePasswordInput(e) {
    if (e.currentTarget.value !== "") {
      this.setState({
        password: e.currentTarget.value,
      });
    }
  }
  loginUser() {
    if (this.state.login !== "" && this.state.password !== "") {
      const credentials = {
        login: this.state.login,
        password: this.state.password,
      };
      fetch("http://localhost:3001/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        credentials: "include",
        headers: {
          "Accept": "*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 406) {
            this.setState((prevState) => {
              return {
                ...prevState,
                showMessage: !this.state.showMessage,
                message: res.message,
              };
            });
          } else if (res.status === "success") {
            this.props.isLogged(res.login);
          }
        });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          showMessage: !this.state.showMessage,
          message: "Login i hasło nie mogą być puste",
        };
      });
    }
  }
  render() {
    return (
      <div className="auth__wrapper">
        {this.state.showMessage ? (
          <Notification type="error" message={this.state.message} />
        ) : null}
        {this.state.showMessage
          ? setTimeout(() => {
              this.setState({
                showMessage: false,
                message: "",
              });
            }, 5000)
          : null}
        <div className="auth__container">
          <h1>Witaj</h1>
          <img src={logo} alt="logo" className="logo__img" />
          <div className="auth__fields">
            <div className="auth__inputs">
              <label htmlFor="login" className="login__label">
                Login:{" "}
                <input
                  type="text"
                  className="auth__input"
                  name="login"
                  onChange={this.handleLoginInput}
                />
              </label>
              <label htmlFor="password" className="password__label">
                Hasło:{" "}
                <input
                  type="password"
                  className="auth__input"
                  name="password"
                  onChange={this.handlePasswordInput}
                />
              </label>
            </div>
            <button className="auth__button" onClick={this.loginUser}>
              Zaloguj
            </button>
          </div>
        </div>
      </div>
    );
  }
}
