function showMessage(type, message) {
    const errorContainer = document.createElement('div'),
        container = document.querySelector('.main__container');

    message.forEach(val => {
        const messageParagraph = document.createElement('p');
        errorContainer.appendChild(messageParagraph);
        messageParagraph.innerText = val;
    })
    if (type == 'error') {
        errorContainer.classList.add('error__container');
    } else {
        errorContainer.classList.add('success__container');
    }
    const loading = document.querySelector('.loading')
    if (loading) {
        loading.remove();

    }
    container.appendChild(errorContainer);

    setTimeout(() => {
        errorContainer.classList.add('remove')
        errorContainer.remove()
    }, 5000)

}


export default {
    showMessage
}