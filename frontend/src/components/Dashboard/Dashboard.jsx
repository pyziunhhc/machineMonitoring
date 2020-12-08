import React from "react";

class Dashboard extends React.Component {
  componentDidMount(){
    this.props.setActivePage("Dashboard");
  }
  render() {
    return <div>Dashboard</div>;
  }
}

export default Dashboard;
