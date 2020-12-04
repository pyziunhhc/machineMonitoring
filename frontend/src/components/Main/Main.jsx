import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Monitoring from "../Monitoring/Monitoring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faWarehouse,
  faTasks,
  faChartBar,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header";
import Auth from "../Authorization/Authorization";
import "./style.css";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        login: "",
        isLogged: false,
      },
      page: {
        active: "",
      },
    };
    this.isLogged = this.isLogged.bind(this);
    this.setActivePage = this.setActivePage.bind(this);
  }
  isLogged(login) {
    if (login) {
      this.setState({
        user: {
          login: login,
          isLogged: !this.state.user.isLogged,
        },
      });
    } else {
      fetch("http://localhost:3001/login", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "*",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            this.setState({
              user: {
                login: res.login,
                isLogged: !this.state.user.isLogged,
              },
            });
          }
        });
    }
  }
  setActivePage(name) {
    this.setState((prevState) => {
      return {
        ...prevState,
        page: {
          active: name,
        },
      };
    });
  }
  componentDidMount() {
    this.isLogged();
  }
  render() {
    if (this.state.user.isLogged) {
      return (
        <React.Fragment>
          <Header
            login={this.state.user.login}
            title={this.state.page.active}
          />
          <div className="main__container">
            <Router>
              <div className="aside__container">
                <aside>
                  <nav className="navigation__container">
                    <ul>
                      <li className="navigation__element">
                        <NavLink to="/dashboard" activeClassName="active">
                          <span>Dashboard</span>
                          <FontAwesomeIcon icon={faHome} size="3x" />
                        </NavLink>
                      </li>
                      <li className="navigation__element">
                        <NavLink to="/monitoring" activeClassName="active">
                          <span>Monitoring</span>
                          <FontAwesomeIcon icon={faWarehouse} size="3x" />
                        </NavLink>
                      </li>
                      <li className="navigation__element">
                        <NavLink to="/operator" activeClassName="active">
                          <span>Operator</span>
                          <FontAwesomeIcon icon={faHome} size="3x" />
                        </NavLink>
                      </li>
                      <li className="navigation__element">
                        <NavLink to="/tasks" activeClassName="active">
                          <span>Zadania</span>
                          <FontAwesomeIcon icon={faTasks} size="3x" />
                        </NavLink>
                      </li>
                      <li className="navigation__element">
                        <NavLink to="/statistics" activeClassName="active">
                          <span>Statystyki</span>
                          <FontAwesomeIcon icon={faChartBar} size="3x" />
                        </NavLink>
                      </li>
                      <li className="navigation__element">
                        <NavLink to="/settings">
                          <span>Ustawienia</span>
                          <FontAwesomeIcon icon={faCogs} size="3x" />
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </aside>
              </div>
              <div className="app__container">
                <Switch>
                  {/* <Route path="/">
                    <Dashboard setActivePage={this.setActivePage} />
                  </Route> */}
                  <Route path="/dashboard">
                    <Dashboard setActivePage={this.setActivePage} />
                  </Route>
                  <Route path="/monitoring">
                    <Monitoring setActivePage={this.setActivePage} />
                  </Route>
                  <Route path="/operator"></Route>
                  <Route path="/tasks"></Route>
                  <Route path="/statistics"></Route>
                  <Route path="/settings"></Route>
                </Switch>
              </div>
            </Router>
          </div>
        </React.Fragment>
      );
    } else {
      return <Auth isLogged={this.isLogged} />;

    }
  }
}
