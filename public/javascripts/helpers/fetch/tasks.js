 function getAllTasks() {
     try {
         return fetch('/tasks/all/list', {
                 method: 'GET',
                 credentials: 'include',
                 headers: {
                     'Accept': '*',
                     'Content-Type': 'application/json',
                 }
             })
             .then(res => res.json())
     } catch (e) {
         return console.log(e)
     }
 }

 function getUserTasks() {
     try {
         return fetch('/tasks/user/list', {
                 method: 'GET',
                 credentials: 'include',
                 headers: {
                     'Accept': '*',
                     'Content-Type': 'application/json',
                 }
             })
             .then(res => res.json())
     } catch (e) {
         return console.log(e)
     }
 }

 function createTask(data) {
     try {
         return fetch('/tasks/add', {
                 method: 'POST',
                 body: JSON.stringify(data),
                 credentials: 'include',
                 headers: {
                     'Accept': '*',
                     'Content-Type': 'application/json',
                 }
             })
             .then(res => res.json())
     } catch (e) {
         return console.log(e)
     }
 }
 function updateStatus(data) {
    try {
        return fetch('/tasks/update/status', {
                method: 'PUT',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
    } catch (e) {
        return console.log(e)
    }
}
function updateSubtask(data) {
    try {
        return fetch('/tasks/update/subtasks', {
                method: 'PUT',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
    } catch (e) {
        return console.log(e)
    }
}
 export default {
     getAllTasks,
     getUserTasks,
     createTask,
     updateStatus,
     updateSubtask
 }