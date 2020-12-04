import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.setActivePage("Dashboard");
  }
  render() {

    return <div>Dashboard</div>;
  }
}

export default Dashboard;
