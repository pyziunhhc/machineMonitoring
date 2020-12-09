import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Monitoring from "../Monitoring/Monitoring";
import Auth from "../Authorization/Authorization";
import TasksList from "../TaskComponents/TasksList/TasksList";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faWarehouse,
  faTasks,
  faChartBar,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header";

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
        page: "",
      },
    };
    this.isLogged = this.isLogged.bind(this);
    this.setActivePage = this.setActivePage.bind(this);
  }
  isLogged(login) {
    if (login) {
      return new Promise((resolve, reject) => {
        this.setState({
          user: {
            login: login,
            isLogged: !this.state.user.isLogged,
          },
        });
        resolve("success");
      });
    } else {
      return fetch("http://localhost:3001/login", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "*",
        },
      }).then((res) => res.json());
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
    this.isLogged()
      .then((res) => {
        if (res.status === "success") {
          this.setState({
            user: {
              login: res.login,
              isLogged: !this.state.user.isLogged,
            },
          });
        }
      })
      .then(() => {
        if (this.state.user.isLogged) {
          const page = (
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
                      <Route path="/dashboard" component={Dashboard}></Route>
                      <Route path="/monitoring" component={Monitoring}></Route>
                      <Route path="/operator"></Route>
                      <Route path="/tasks" component={TasksList}></Route>
                      <Route path="/statistics"></Route>
                      <Route path="/settings"></Route>
                    </Switch>
                  </div>
                </Router>
              </div>
            </React.Fragment>
          );
          this.setState((prevState) => {
            return {
              ...prevState,
              page: {
                active: this.state.page.active,
                page: page,
              },
            };
          });
          <Redirect to="/monitoring" />;
        } else {
          this.setState((prevState) => {
            return {
              ...prevState,
              page: {
                active: this.state.page.active,
                page: <Auth isLogged={this.isLogged} />,
              },
            };
          });
        }
      });
  }
  render() {
    return this.state.page.page;
  }
}
