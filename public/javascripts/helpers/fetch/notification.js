function getNotification() {
    try {
        return fetch('/notification/get', {
                method: 'POST',
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

function updateNotification(data) {
    try {
        return fetch('/notification/update', {
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
    getNotification,
    updateNotification
}