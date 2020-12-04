// import { Component } from "react";
// import React from "react";
// import Dygraph from "dygraphs";

// export default class Dygraphs extends Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     let data = this.createChart();
//     console.log(data, this);
//     let test = new Dygraph(this.ref.chart, data)
//   }
//   createChart() {
//     let data = null;
//     try {
//       data = this.props.data.map((element, index) => {
//         return element.map((data, index) => {
//           if (index == 0) {
//             return new Date(data);
//           } else {
//             return data;
//           }
//         });
//       });
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   render() {
//     return <div ref="chart"></div>;
//   }
// }
