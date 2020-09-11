function showSettings() {
    return fetch('/settings', {
            method: 'POST',
            //body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}

export default {
    showSettings
}