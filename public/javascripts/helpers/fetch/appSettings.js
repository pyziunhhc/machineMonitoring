function showSettings() {
    return fetch('/api/menu/settings', {
            method: 'POST',
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