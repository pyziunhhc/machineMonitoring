function showSettings() {
    //fetch przeniesc do osobnej fukcji
    return fetch('/api/settings', {
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