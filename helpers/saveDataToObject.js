// //const  helpers = require('../Helpers/helpers.js')
// const saveStatuses = (machine, status, start, end, time) => {
//     switch (status) {
//         case 'ERODOWANIE': {
//             machine.machineStatsForDygraph.push([start, time / 1000, null, null, null, null, null, null, null, null, null, null, null, null, null]);
//             machine.sumMachineStats.erodowanie.data.time += time;
//         }
//             break;
//         case 'SZLIFOWANIE': {
//             machine.machineStatsForDygraph.push([start, null, time / 1000, null, null, null, null, null, null, null, null, null, null, null, null]);
//             machine.sumMachineStats.szlifowanie.data.time += time;
//         }
//         break;
//         case 'DISCONNECT': {
//             machine.machineStatsForDygraph.push([start, null, null, time / 1000, null, null, null, null, null, null, null, null, null, null, null]);
//             machine.sumMachineStats.disconnect.data.time += time;
//         }
//         break;
//         case null: {
//             machine.machineStatsForDygraph.push([start, null, null, time / 1000, null, null, null, null, null, null, null, null, null, null, null]);
//             machine.sumMachineStats.disconnect.data.time += time;
//         }
//         break;
//         case 'WARMUP': {
//             machine.machineStatsForDygraph.push([start, null, null, null, time / 1000, null, null, null, null, null, null, null, null, null, null]);
//             machine.sumMachineStats.warmup.data.time += time;
//         }

//         break;
//         case 'MANUAL': {
//             machine.machineStatsForDygraph.push([start, null, null, null, null, time / 1000, null, null, null, null, null, null, null, null, null]);
//             machine.sumMachineStats.manual.data.time += time;
//         }
//         break;
//         case 'WYMIANA_SCIERNICY': {
//             machine.machineStatsForDygraph.push([start, null, null, null, null, null, null, null, null, time / 1000, null, null, null, null, null]);
//             machine.sumMachineStats.wymiana_sciernicy.data.time += time;
//         }
//         break;
//         case 'STOP': {
//             if (time > 30000000) {
//                 if ((start.getHours() >= 7 && start.getHours() <= 14) && (start.getDate() < end.getDate())) {
//                     end = new Date(new Date(start).getFullYear(), new Date(start).getMonth(), new Date(start).getDate(), 15, 0, 0);
//                     let time = end - start;
//                     machine.machineStatsForDygraph.push([start, null, null, null, null, null, time / 1000, null, null, null, null, null, null, null, null]);
//                     machine.sumMachineStats.stop.data.time += time;
//                 }
//                 if ((start.getHours() >= 15 && start.getHours() <= 22) && (start.getDate() < end.getDate())) {
//                     end = new Date(new Date(start).getFullYear(), new Date(start).getMonth(), new Date(start).getDate(), 23, 0, 0);
//                     let time = end - start;
//                     machine.machineStatsForDygraph.push([start, null, null, null, null, null, time / 1000, null, null, null, null, null, null, null, null]);
//                     machine.sumMachineStats.stop.data.time += time;

//                 }
//             } else {
//                 machine.machineStatsForDygraph.push([start, null, null, null, null, null, time / 1000, null, null, null, null, null, null, null, null]);
//                 machine.sumMachineStats.stop.data.time += time;
//             }
//         }
//         break;
//         case 'SUSPEND': {
//             machine.machineStatsForDygraph.push([start, null, null, null, null, null, null, time / 1000, null, null, null, null, null, null, null]);
//             machine.sumMachineStats.suspend.data.time += time;
//             break;
//         }

//         case 'EMERGENCY': {
//             machine.machineStatsForDygraph.push([start, null, null, null, null, null, null, null, time / 1000, null, null, null, null, null, null]);
//             machine.sumMachineStats.alarm.data.time += time;
//         }
//         break;
//         case 'ROZGRZEWKA': {
//             machine.machineStatsForDygraph.push([start, null, null, null, null, null, null, null, null, null, null, null, time / 1000, null, null]);
//             machine.sumMachineStats.rozgrzewka.data.time += time;
//         }
//         break;
//         case 'ZATRZYMANIE': {
//             machine.machineStatsForDygraph.push([start, null, null, null, null, null, null, null, null, null, null, null, null, time / 1000, null]);
//             machine.sumMachineStats.zatrzymanie.data.time += time;
//         }
//         break;
//         case 'PRACA': {
//             machine.machineStatsForDygraph.push([start, null, null, null, null, null, null, null, null, null, null, null, null, null, time / 1000]);
//             machine.sumMachineStats.praca.data.time += time;
//         }
//         break;
//     }
// }


// const saveAll = (machine, status, start, end, time, feed, potentiometr) => {
//     let test = [];
//     switch (status) {
//         case 'ERODOWANIE': {
//             test.push({
//                 status: status,
//                 start: start,
//                 end: end,
//                 time: time,
//                 feed: feed,
//                 potentiometr: potentiometr,
//             })
//         }
//         break;
//     case 'SZLIFOWANIE': {
//         test.push({
//             status: status,
//             start: start,
//             end: end,
//             time: time,
//             feed: feed,
//             potentiometr: potentiometr,
//         })
//     }
//     break;
//     case 'DISCONNECT': {
//         test.push({
//             status: status,
//             start: start,
//             end: end,
//             time: time,
//             feed: feed,
//             potentiometr: potentiometr,
//         })
//     }
//     break;
//     case null: {
//         test.push({
//             status: status,
//             start: start,
//             end: end,
//             time: time,
//             feed: feed,
//             potentiometr: potentiometr,
//         })
//     }
//     break;
//     case 'WARMUP': {
//         test.push({
//             status: status,
//             start: start,
//             end: end,
//             time: time,
//             feed: feed,
//             potentiometr: potentiometr,
//         })
//     }

//     break;
//     case 'MANUAL': {
//         test.push({
//             status: status,
//             start: start,
//             end: end,
//             time: time,
//             feed: feed,
//             potentiometr: potentiometr,
//         })
//     }
//     break;
//     case 'WYMIANA': {
//         test.push({
//             status: status,
//             start: start,
//             end: end,
//             time: time,
//             feed: feed,
//             potentiometr: potentiometr,
//         })
//     }
//     break;
//     case 'STOP': {
//         test.push({
//             status: status,
//             start: start,
//             end: end,
//             time: time,
//             feed: feed,
//             potentiometr: potentiometr,
//         })
//     }
//     break;
//     case 'SUSPEND': {
//         test.push({
//             status: status,
//             start: start,
//             end: end,
//             time: time,
//             feed: feed,
//             potentiometr: potentiometr,
//         })
//         break;
//     }

//     case 'EMERGENCY': {
//         test.push({
//             status: status,
//             start: start,
//             end: end,
//             time: time,
//             feed: feed,
//             potentiometr: potentiometr,
//         })
//     }
//     break;
//     case 'ROZGRZEWKA': {
//         test.push({
//             status: status,
//             start: start,
//             end: end,
//             time: time,
//             feed: feed,
//             potentiometr: potentiometr,
//         })
//     }
//     break;
//     case 'ZATRZYMANIE': {
//         test.push({
//             status: status,
//             start: start,
//             end: end,
//             time: time,
//             feed: feed,
//             potentiometr: potentiometr,
//         })
//     }
//     break;
//     case 'PRACA': {
//         test.push({
//             status: status,
//             start: start,
//             end: end,
//             time: time,
//             feed: feed,
//             potentiometr: potentiometr,
//         })
//     }
//     break;


//     }
// }
// module.export = {
//     saveStatuses,
//     saveAll
// } //, saveFeed, savePotentiometr};