import React from "react";
// import Auth from "./components/Authorization/Authorization";
// import PrivateRoute from "./Routes/PrivateRoute";
// import { AuthContext } from "./context/auth";

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   NavLink,
// } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faWarehouse,
//   faTasks,
//   faChartBar,
//   faCogs,
// } from "@fortawesome/free-solid-svg-icons";

// import Dashboard from "./components/Dashboard/Dashboard";
// import Monitoring from "./components/Monitoring/Monitoring";
// import TasksList from "./components/TaskComponents/TasksList/TasksList";
// import Header from "./components/Header/Header";

import Main from "./components/Main/Main"
function App() {
  // return (
  //   <React.Fragment>
  //     <AuthContext.Provider value={false}>
  //       <Header />
  //       <div className="main__container">
  //         <Router>
  //           <div className="aside__container">
  //             <aside>
  //               <nav className="navigation__container">
  //                 <ul>
  //                   <li className="navigation__element">
  //                     <NavLink to="/dashboard" activeClassName="active">
  //                       <span>Dashboard</span>
  //                       <FontAwesomeIcon icon={faHome} size="3x" />
  //                     </NavLink>
  //                   </li>
  //                   <li className="navigation__element">
  //                     <NavLink to="/monitoring" activeClassName="active">
  //                       <span>Monitoring</span>
  //                       <FontAwesomeIcon icon={faWarehouse} size="3x" />
  //                     </NavLink>
  //                   </li>
  //                   <li className="navigation__element">
  //                     <NavLink to="/operator" activeClassName="active">
  //                       <span>Operator</span>
  //                       <FontAwesomeIcon icon={faHome} size="3x" />
  //                     </NavLink>
  //                   </li>
  //                   <li className="navigation__element">
  //                     <NavLink to="/tasks" activeClassName="active">
  //                       <span>Zadania</span>
  //                       <FontAwesomeIcon icon={faTasks} size="3x" />
  //                     </NavLink>
  //                   </li>
  //                   <li className="navigation__element">
  //                     <NavLink to="/statistics" activeClassName="active">
  //                       <span>Statystyki</span>
  //                       <FontAwesomeIcon icon={faChartBar} size="3x" />
  //                     </NavLink>
  //                   </li>
  //                   <li className="navigation__element">
  //                     <NavLink to="/settings">
  //                       <span>Ustawienia</span>
  //                       <FontAwesomeIcon icon={faCogs} size="3x" />
  //                     </NavLink>
  //                   </li>
  //                 </ul>
  //               </nav>
  //             </aside>
  //           </div>
  //           <div className="app__container">
  //             <Switch>
  //               <Route path="/login" component={Auth}></Route>
  //               <PrivateRoute
  //                 exact
  //                 path="/dashboard"
  //                 component={Dashboard}></PrivateRoute>
  //               <PrivateRoute
  //                 path="/monitoring"
  //                 component={Monitoring}></PrivateRoute>
  //               <PrivateRoute path="/operator"></PrivateRoute>
  //               <PrivateRoute
  //                 path="/tasks"
  //                 component={TasksList}></PrivateRoute>
  //               <PrivateRoute path="/statistics"></PrivateRoute>
  //               <PrivateRoute path="/settings"></PrivateRoute>
  //             </Switch>
  //           </div>
  //         </Router>
  //       </div>
  //     </AuthContext.Provider>
  //   </React.Fragment>
  // );
  return (<Main/>)
}

export default App;
