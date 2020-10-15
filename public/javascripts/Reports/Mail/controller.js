import MailReport from './settings.js'

window.onload = function () {
    const availablePersonsContainer = document.querySelectorAll('.available-persons'),
        addedPersonsContainer = document.querySelectorAll('.added-persons');
    const mailReport = new MailReport(availablePersonsContainer, addedPersonsContainer);
    mailReport.createDOM()
}