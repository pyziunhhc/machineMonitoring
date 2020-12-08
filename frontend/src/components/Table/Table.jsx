import { Component } from "react";
import "./style.css";

export default class Table extends Component {
  render() {
    let thead = [
        <thead>
          <tr key="table_tr_1">
            <th key="table_head1">Status</th>
            <th key="table_head2">Czas</th>
            <th key="table_head3">%</th>
          </tr>
        </thead>,
      ],
      table = [];
    Object.values(this.props.data)
      .filter((data) => {
        return data.data.time > 0 && data.data.show;
      })
      .map((data, index) => {
        table.push(
          <tr key={`${data.className}_${index}_${Math.random()*10}}`}>
            <td key={`${data.className}_${index}_${Math.random()*10}}`} className={data.className}>
              {data.displayName}
            </td>
            <td key={`${data.className}_${index}_${Math.random()*10}}`} className={data.className}>
              {parseMillisecondsIntoReadableTime(data.data.time)}
            </td>
            <td
              key={`${data.className}_${index}_${Math.random()*10}}`}
              className={data.className}>{`${data.data.percentage}%`}</td>
          </tr>
        );
        return true;
      });
    return (
      <table>
        {thead}
        <tbody>{table}</tbody>
      </table>
    );
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
