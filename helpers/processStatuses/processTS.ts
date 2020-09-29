type summaryModel = {
  erodowanie: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  szlifowanie: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  praca: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  disconnect: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  manual: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  warmup: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  stop: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  suspend: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  emergency: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  rozgrzewka: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  wymiana_sciernicy: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  wymianaNarzedzia: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  przejscie: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  zatrzymanie: {
    name: string;
    displayName: string;
    className: string;
    color: string;
    data: {
      time: number;
      feed: number;
      averageFeed: number;
      potentiometr: number;
      percentage: number;
    };
  };
  sumOfTimes: {
    displayName: string;
    data: {
      time: number;
    };
  };
};
type fromAPI = {
  start: string;
  end: string | null;
  value: string | null;
};
type dygraph = [
  start: Date,
  feedValue: number,
  field1: number | null,
  field2: number | null,
  field3: number | null,
  field4: number | null,
  field5: number | null,
  field6: number | null,
  field7: number | null,
  field8: number | null,
  field9: number | null,
  field10: number | null,
  field11: number | null,
  field12: number | null,
  field13: number | null,
  field14: number | null
];
const summaryMachineStatisticsTS = (
  data: Array<fromAPI>,
  from: Date,
  to: Date
) => {
  const DATA = data;
  let summaryMachineStatistics: summaryModel = {
    erodowanie: {
      name: "erodowanie",
      displayName: "Erodowanie",
      className: "eroding",
      color: "rgba(0, 82, 20, 0.9)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    szlifowanie: {
      name: "szlifowanie",
      displayName: "Szlifowanie",
      color: "rgba(0, 209, 44, 0.9)",
      className: "grinding",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    praca: {
      name: "praca",
      displayName: "Praca",
      className: "working",
      color: "rgba(0, 82, 20, 0.9)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    disconnect: {
      name: "disconnect",
      displayName: "Wyłączona",
      className: "disconnect",
      color: "rgba(145, 145, 145, 1)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    manual: {
      name: "manual",
      displayName: "Załadunek\nRobotem",
      className: "robotLoading",
      color: "rgba(200,0,200,1)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    warmup: {
      name: "warmup",
      displayName: "Załadunek Ręczny",
      className: "manualLoading",
      color: "rgba(81, 182, 215,1)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    stop: {
      name: "stop",
      displayName: "Stop",
      className: "stop",
      color: "rgba(243, 230, 0, 1)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    suspend: {
      name: "suspend",
      displayName: "Pomiar",
      className: "measuring",
      color: "rgba(255, 177, 51, 1)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    emergency: {
      name: "emergency",
      displayName: "Alarm",
      className: "alarm",
      color: "rgba(255,0,0,1)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    rozgrzewka: {
      name: "rozgrzewka",
      displayName: "Rozgrzewka",
      className: "warmup",
      color: "rgba(168,80,80,1)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    wymiana_sciernicy: {
      name: "wymiana_sciernicy",
      displayName: "Wymiana\nŚciernicy",
      className: "wheelReplacement",
      color: "rgba(0,0,0,1)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    wymianaNarzedzia: {
      name: "wymianaNarzedzia",
      displayName: "Wymiana\nNarzędzia",
      className: "toolChange",
      color: "rgba(206, 183, 119, 1)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    przejscie: {
      name: "przejscie",
      displayName: "Przejście",
      className: "transition",
      color: "rgba(255,112,183,1)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    zatrzymanie: {
      name: "zatrzymanie",
      displayName: "Zatrzymanie",
      className: "suspend",
      color: "rgba(145,19,19,1)",
      data: {
        time: 0,
        feed: 0,
        averageFeed: 0,
        potentiometr: 0,
        percentage: 0,
      },
    },
    sumOfTimes: {
      displayName: "Suma",
      data: {
        time: 0,
      },
    },
  };

  DATA.map((data, index) => {
    let start = new Date(data.start),
      end = new Date(data.end),
      time = Number(end) - Number(start),
      status = data.value;

    if (index == 0) {
      if (start != new Date(from)) {
        let start = new Date(from);
        time = Number(end) - Number(start);
      }
    }
    if (data.end == null) {
      time = Number(new Date()) - Number(start);
      summaryMachineStatistics.sumOfTimes.data.time += time;
    } else {
      summaryMachineStatistics.sumOfTimes.data.time += time;
    }
    switch (status) {
      case "ERODOWANIE":
        {
          summaryMachineStatistics.erodowanie.data.time += time;
        }
        break;
      case "SZLIFOWANIE":
        {
          summaryMachineStatistics.szlifowanie.data.time += time;
        }

        break;
      case "DISCONNECT":
        {
          summaryMachineStatistics.disconnect.data.time += time;
        }
        break;
      case "null":
        {
          summaryMachineStatistics.disconnect.data.time += time;
        }
        break;
      case "WARMUP":
        {
          summaryMachineStatistics.warmup.data.time += time;
        }
        break;
      case "MANUAL":
        {
          summaryMachineStatistics.manual.data.time += time;
        }
        break;
      case "WYMIANA":
        {
          summaryMachineStatistics.wymiana_sciernicy.data.time += time;
        }
        break;
      case "STOP":
        {
          summaryMachineStatistics.stop.data.time += time;
        }
        break;
      case "SUSPEND":
        {
          summaryMachineStatistics.suspend.data.time += time;
        }
        break;
      case "EMERGENCY":
        {
          summaryMachineStatistics.emergency.data.time += time;
        }
        break;
      case "ROZGRZEWKA":
        {
          summaryMachineStatistics.rozgrzewka.data.time += time;
        }
        break;
      case "ZATRZYMANIE":
        {
          summaryMachineStatistics.zatrzymanie.data.time += time;
        }
        break;
      case "PRACA":
        {
          summaryMachineStatistics.praca.data.time += time;
        }
        break;
    }
  });
  return summaryMachineStatistics;
};

const statusesForDygraphTS = (data) => {
  const DATA = data;
  let statsForDygraph: dygraph[];

  DATA.forEach((data) => {
    let start: Date = new Date(data.start),
      end: Date = new Date(data.end),
      time: number = Number(end) - Number(start),
      feedValue: number = 0,
      status = `${data.value}`;
    if (data.end == null) {
      time = Number(new Date()) - Number(start);
    }
    switch (status) {
      case "ERODOWANIE":
        {
          statsForDygraph.push([
            start,
            feedValue,
            time,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]);
        }
        break;
      case "SZLIFOWANIE":
        {
          statsForDygraph.push([
            start,
            feedValue,
            null,
            time,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]);
        }
        break;
      case "DISCONNECT":
        {
          statsForDygraph.push([
            start,
            feedValue,
            null,
            null,
            time,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]);
        }
        break;
      case "null":
        {
          statsForDygraph.push([
            start,
            feedValue,
            null,
            null,
            time,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]);
        }
        break;
      case "WARMUP":
        {
          statsForDygraph.push([
            start,
            feedValue,
            null,
            null,
            null,
            time,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]);
        }
        break;
      case "MANUAL":
        {
          statsForDygraph.push([
            start,
            feedValue,
            null,
            null,
            null,
            null,
            time,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]);
        }
        break;
      case "WYMIANA":
        {
          statsForDygraph.push([
            start,
            feedValue,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            time,
            null,
            null,
            null,
            null,
            null,
          ]);
        }
        break;
      case "STOP":
        {
          statsForDygraph.push([
            start,
            feedValue,
            null,
            null,
            null,
            null,
            null,
            time,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]);
        }
        break;
      case "SUSPEND":
        {
          statsForDygraph.push([
            start,
            feedValue,
            null,
            null,
            null,
            null,
            null,
            null,
            time,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ]);
        }
        break;
      case "EMERGENCY":
        {
          statsForDygraph.push([
            start,
            feedValue,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            time,
            null,
            null,
            null,
            null,
            null,
            null,
          ]);
        }
        break;
      case "ROZGRZEWKA":
        {
          statsForDygraph.push([
            start,
            feedValue,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            time,
            null,
            null,
          ]);
        }
        break;
      case "ZATRZYMANIE":
        {
          statsForDygraph.push([
            start,
            feedValue,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            time,
            null,
          ]);
        }
        break;
      case "PRACA":
        {
          statsForDygraph.push([
            start,
            feedValue,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            time,
          ]);
        }
        break;
    }
  });
  return statsForDygraph;
};

const statusesForChartJSTS = (data) => {
  let avaibleLabels: string[],
    statusesColors: string[],
    percentageValuesForChartJS: Number[],
    timeValuesForChartJS: Date[];
  const DATA: summaryModel = data;

  Object.values(DATA)
    .filter((val) => {
      return val.data.time > 0;
    })
    .map((val) => {
      console.log(val);
      // if (name) {
      //     avaibleLabels.push(val.displayName);
      //     statusesColors.push(val.color)
      // }

      // return val;
    });
  // .map((val, index) => {
  //     if (val.name) {
  //         percentageValuesForChartJS.push((parseFloat(val.data.time) * 100 / data.sumOfTimes.data.time).toFixed(2));
  //     }
  //     return val;
  // })
  // .map(val => {
  //     if (val.name) {
  //         timeValuesForChartJS.push(new Date(val.data.time));
  //     }
  //     return val;
  // })
  return {
    labels: avaibleLabels,
    colors: statusesColors,
    percentage: percentageValuesForChartJS,
    time: timeValuesForChartJS,
  };
};


module.exports = {
  summaryMachineStatisticsTS,
  statusesForDygraphTS,
  statusesForChartJSTS,
  // updateSummaryMachineStatistics,
  // updateStatusesForDygraph,
  // updateStatusesForChartJS
};