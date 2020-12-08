import { Component } from "react";
import React from "react";
import Dygraph from "dygraphs";

/**TODO
 * - nie odbiera danych z propsow
 */
export default class Dygraphs extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.data = this.props.data;
    this.labels = [
      "start",
      "Posuw",
      "Erodowanie",
      "Szlifowanie",
      "Wyłączona",
      "Zał.Ręczny",
      "Zał.Robotem",
      "Stop",
      "Pomiar",
      "Alarm",
      "Wymiana Ściernicy",
      "Wymiana Narzędzia",
      "Przejście",
      "Rozgrzewka",
      "Zatrzymanie",
      "Praca",
    ];
    this.colors = {
      erodowanie: {
        name: "erodowanie",
        displayName: "Erodowanie",
        className: "eroding",
        color: "rgba(0, 82, 20, 0.9)",
      },
      szlifowanie: {
        name: "szlifowanie",
        displayName: "Szlifowanie",
        color: "rgba(0, 209, 44, 0.9)",
        className: "grinding",
      },
      praca: {
        name: "praca",
        displayName: "Praca",
        className: "working",
        color: "rgba(0, 82, 20, 0.9)",
      },
      disconnect: {
        name: "disconnect",
        displayName: "Wyłączona",
        className: "disconnect",
        color: "rgba(145, 145, 145, 1)",
      },
      manual: {
        name: "manual",
        displayName: "Załadunek\nRobotem",
        className: "robotLoading",
        color: "rgba(200,0,200,1)",
      },
      warmup: {
        name: "warmup",
        displayName: "Załadunek Ręczny",
        className: "manualLoading",
        color: "rgba(81, 182, 215,1)",
      },
      stop: {
        name: "stop",
        displayName: "Stop",
        className: "stop",
        color: "rgba(243, 230, 0, 1)",
      },
      suspend: {
        name: "suspend",
        displayName: "Pomiar",
        className: "measuring",
        color: "rgba(255, 177, 51, 1)",
      },
      alarm: {
        name: "alarm",
        displayName: "Alarm",
        className: "alarm",
        color: "rgba(255,0,0,1)",
      },
      rozgrzewka: {
        name: "rozgrzewka",
        displayName: "Rozgrzewka",
        className: "warmup",
        color: "rgba(168,80,80,1)",
      },
      wymiana_sciernicy: {
        name: "wymiana_sciernicy",
        displayName: "Wymiana\nŚciernicy",
        className: "wheelReplacement",
        color: "rgba(0,0,0,1)",
      },
      wymianaNarzedzia: {
        name: "wymianaNarzedzia",
        displayName: "Wymiana\nNarzędzia",
        className: "toolChange",
        color: "rgba(206, 183, 119, 1)",
      },
      przejscie: {
        name: "przejscie",
        displayName: "Przejście",
        className: "transition",
        color: "rgba(255,112,183,1)",
      },
      zatrzymanie: {
        name: "zatrzymanie",
        displayName: "Zatrzymanie",
        className: "suspend",
        color: "rgba(145,19,19,1)",
      },
    };
  }
  createChart() {
    return new Dygraph("dygraph", this.data, {
      labels: this.labels,
      colors: [
        this.colors.erodowanie.color,
        this.colors.erodowanie.color,
        this.colors.szlifowanie.color,
        this.colors.disconnect.color,
        this.colors.warmup.color,
        this.colors.manual.color,
        this.colors.stop.color,
        this.colors.suspend.color,
        this.colors.alarm.color,
        this.colors.wymiana_sciernicy.color,
        this.colors.wymianaNarzedzia.color,
        this.colors.przejscie.color,
        this.colors.rozgrzewka.color,
        this.colors.zatrzymanie.color,
        this.colors.praca.color,
      ],
      visibility: [
        false,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
      stepPlot: true,
      fillGraph: true,
      fillAlpha: 1,
      height: 150,
      valueRange: [0, 1],
      displayAnnotations: true,
      axes: {
        y: {
          drawAxis: false,
        },
      },
      valueFormatter: function (value, opts, seriesName) {
        if (seriesName !== "start") {
          return `Czas: ${parseMillisecondsIntoReadableTime(value)}`;
        } else {
          return `Start: ${new Date(value).toLocaleDateString()} ${new Date(
            value
          ).toLocaleTimeString()}`;
        }
      },
      zoomCallback: function (minDate, maxDate) {
        this.updateOptions({
          valueRange: [0, 1]
        })
      }
    });
  }
  componentDidMount() {
    this.createChart();
  }
  render() {
    return <div id="dygraph"></div>;
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