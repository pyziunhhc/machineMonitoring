// const saveToObject = require('./saveDataToObject')
// const processStatuses = (data, machine, screenType) => {
//     try {
//         data.map((data, index) => {
//             if (screenType == 'analityk') {
//                 let start = new Date(data.start),
//                     end = new Date(data.end),
//                     time = end - start;
//                 if (data.end == null) {
//                     end = new Date();
//                     time = end - start;
//                     machine.lastStatus = data.value;
//                     if (data.value != null) {
//                         machine.lastStatus = data.value;
//                     } else {
//                         machine.lastStatus = 'DISCONNECT';
//                     }
//                     saveToObject.saveStatuses(machine, data.value, start, end, time);
//                 } else {
//                     saveToObject.saveStatuses(machine, data.value, start, end, time);
//                 }
//                 //}

//             } else {
//                 let start = new Date(data.start),
//                     end = new Date(data.end),
//                     time = end - start;
//                     if (data.end == null) {
//                         end = new Date();
//                         time = end - start;
//                         machine.lastStatus = data.value;
//                         if (data.value != null) {
//                             machine.lastStatus = data.value;
//                         } else {
//                             machine.lastStatus = 'DISCONNECT';
//                         }
//                         saveToObject.saveStatuses(machine, data.value, start, end, time);
//                     } else {

//                         saveToObject.saveStatuses(machine, data.value, start, end, time);
//                     }
//             }
//         })
//         let dataForTable = [];
//         Object.values(machine.sumMachineStats)
//             .filter(val => {
//                 return val.data.time > 0;
//             })
//             .map(val => {
//                 machine.avaibleLabels.chartJSLabels.push(`${val.displayName}`);
//                 machine.statusesColors.push(val.color)
//                 return val;
//             })
//             .map(val => {
//                 machine.sumOfTimes += parseFloat(val.data.time);
//                 return val;
//             })
//             .map(val => {
//                 machine.sumMachineStats[val.name].data.percentage = parseFloat(machine.sumMachineStats[val.name].data.time * 100 / machine.sumOfTimes).toFixed(2);
//                 machine.percentageValuesForChartJS.push((parseFloat(val.data.time) * 100 / machine.sumOfTimes).toFixed(2));
//                 return val;
//             })
//             .map(val => {
//                 machine.timeValuesForChartJS.push(new Date(val.data.time));
//                 return val;
//             }).map(val => {
//                 dataForTable.push({
//                     time: val.data.time,
//                     percentage: val.data.percentage,
//                     displayName: val.displayName
//                 })
//             })
//         return dataForTable;
//     } catch (e) {
//         console.log(e)
//     }


// };


// module.exports =  processStatuses;