import { Component } from "react";
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';
import "./style.css";
export default class Chart extends Component {
  createChart() {
    let chartType = this.props.type;
    const data = {
        labels: this.props.data.labels,

        datasets: [
          {
            label: this.props.type,
            data: chartType === "time" ? this.props.data.time : this.props.data.percentage,
            backgroundColor: this.props.data.colors,
          },
        ],
      },
      options = {
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
                min: 0.1,
                stacked: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                display: false,
                min: 0.1,
                stacked: true,
              },
            },
          ],
        },
        showAllTooltips: true,
        tooltips: {
          custom: function (tooltip) {
            try {
              let value = tooltip.body[0].lines[0].split(": ")[1];
              tooltip.body[0].lines[0] =
                chartType === "percentage"
                  ? `${value}%`
                  : parseMillisecondsIntoReadableTime(value);
              tooltip.bodyFontSize = 20;
              if (!tooltip) return;
              tooltip.displayColors = false;
            } catch (e) {
              console.log(e);
            }
          },
        },
        layout: {
          padding: {
            top: 20,
            bottom: 20,
          },
        },
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            align: "end",
            clamp: true,
            overlap: "auto",
            clip: true,
            visibility: "auto",
            display: true,
            backgroundColor: function (context) {
              return context.dataset.backgroundColor;
            },
            formatter: function (value, context) {
              return chartType === "percentage"
                ? `${value}%`
                : parseMillisecondsIntoReadableTime(value);
            },
            borderRadius: 4,
            font: {
              size: 15,
              weight: "bold",
            },
            color: "black",
            textShadowColor: "black",
            //rotation: rotation
          },
        },
        legend: {
          display: false,
        },
      };
    return <Bar data={data} options={options} width={500} height={500} />;
  }
  componentDidMount() {}
  render() {
    return <div>{this.createChart()}</div>;
  }
}
const parseMillisecondsIntoReadableTime = (milliseconds) => {
  //Get hours from milliseconds

  let hours = milliseconds / 1000 / 60 / 60,
    absoluteHours = Math.floor(hours),
    h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours,
    //Get remainder from hours and convert to minutes
    minutes = (hours - absoluteHours) * 60,
    absoluteMinutes = Math.floor(minutes),
    m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes,
    //Get remainder from minutes and convert to seconds
    seconds = (minutes - absoluteMinutes) * 60,
    absoluteSeconds = Math.floor(seconds),
    s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

  return `${h}:${m}:${s}`;
};
