const express = require('express');
const router = express.Router();
const {
   getStatuses,
   getGroups,
   getMachines
} = require('../helpers/fetchFromMainApp');
const {
   whatMachineDoingGraph,
   whatMachineDoingTable,
   currentMachinesWork
} = require('../helpers/processStatuses/dashboard');
const auth = require('./middleware/authenticate')

router.get('/', auth, (req, res, next) => {
   res.render('dashboard', {
      title: 'Dashboard | Monitoring ITA Tools Sp. z o.o',
      jsfiles: 'Dashboard/dashboard.js',
      cssfiles: 'dashboard',
      login: req.cookies.login,
   })
})


router.post('/get/table/whatMachinesDoingNow', (req, res, next) => { //Zmienićna /get/table/currentStatuses
   const {
      from,
      to
   } = req.body;
   let machinesArray = [];
   getGroups().then(groups => {
      const firstHallGroup = groups[0].name;
      getMachines(firstHallGroup).then(machines => {
         let len = machines.length;
         machines.map(machine => {
            getStatuses(machine.name, from, to).then(statuses => {
               machinesArray.push({
                  name: machine.name,
                  statuses: statuses[0].value
               })
               if (len == machinesArray.length) {
                  const dataForTable = whatMachineDoingTable(machinesArray);
                  res.send({
                     forTable: dataForTable,
                  })
               }

            }).catch(e => {
               console.log(e)
            })
         })
      }).catch(e => {
         console.log(e)
      })
   }).catch(e => {
      console.log(e)
   })

})
router.post('/get/graph/whatMachinesDoingNow', (req, res, next) => { //Zmienić route na /get/graph/currentStatuses
   const {
      from,
      to
   } = req.body;
   let machinesArray = [];
   getGroups().then(groups => {
      const firstHallGroup = groups[0].name;
      getMachines(firstHallGroup).then(machines => {
         let len = machines.length;
         machines.map(machine => {
            getStatuses(machine.name, from, to).then(statuses => {

               machinesArray.push({
                  name: machine.name,
                  statuses: statuses[0].value
               })
               if (len == machinesArray.length) {
                  const dataForGraph = whatMachineDoingGraph(machinesArray);
                  res.send({
                     forGraph: dataForGraph
                  })
               }
            })
         })
      })
   }).catch(e => {
      console.log(e)
   })
})

router.post('/get/table/summaryMachinesWork', (req, res, next) => {
   const {
      from,
      to
   } = req.body;
   let machinesArray = [];
   getGroups().then(groups => {
      const firstHallGroup = groups[0].name;
      getMachines(firstHallGroup).then(machines => {
         let len = machines.length;
         machines.map(machine => {
            getStatuses(machine.name, from, to)
               .then(statuses => {
                  machinesArray.push({
                     name: machine.name,
                     statuses: statuses,
                  })
                  if (len == machinesArray.length) {
                     const data = currentMachinesWork(machinesArray, from, to);
                     res.send({
                        currentWork: data
                     })
                  }
               })
         })
      })
   }).catch(e => {
      console.log(e)
   })
})
module.exports = router;