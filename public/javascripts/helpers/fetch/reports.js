function showUsers() {
    return fetch('/reports/mail/users', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}

function addUser(data) {
    return fetch('/reports/mail/users/update', {
            method: 'PUT',
            body: JSON.stringify({
                user: data.user,
                daily: data.daily,
                monthly: data.monthly
            }),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}
function createXLSX(data) {
    return fetch('/reports/data/get/summary', {
             method: 'POST',
             body: JSON.stringify(data),
             credentials: 'include',
             headers: {
                 'Accept': '*',
                 'Content-Type': 'application/json',
             }
         })
         .then(json => json.json())
 }
export default {
    showUsers,
    addUser,
    createXLSX
}