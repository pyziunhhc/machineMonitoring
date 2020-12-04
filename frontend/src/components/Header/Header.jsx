import React from "react";
import logo from "./logo.png";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
class Header extends React.Component {
  signOut() {
    fetch("http://localhost:3001/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {

      });
  }
  render() {
    return (
      <div className="header__container">
        <div className="minimized-panels__container"></div>
        <div className="logo__container">
          <img src={logo} alt="logo" />
          <h1>{`ITA Tools | ${this.props.title}`}</h1>
        </div>
        <div className="notification">
          <FontAwesomeIcon icon={faBell} size="lg" />
          <p className="counter">0</p>
        </div>
        <div className="logged-user__container">
          <p>{`Zalogowany: ${this.props.login}`}</p>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size="3x"
            className="sign-out__button"
            onClick={this.signOut}
          />
        </div>
      </div>
    );
  }
}

export default Header;
