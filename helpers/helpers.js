function parseMillisecondsIntoReadableTime(milliseconds) {
    //Get hours from milliseconds

    let hours = milliseconds / 1000 / 60 / 60,
        absoluteHours = Math.floor(hours),
        h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours,

        //Get remainder from hours and convert to minutes
        minutes = (hours - absoluteHours) * 60,
        absoluteMinutes = Math.floor(minutes),
        m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes,

        //Get remainder from minutes and convert to seconds
        seconds = (minutes - absoluteMinutes) * 60,
        absoluteSeconds = Math.floor(seconds),
        s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


    return `${h}:${m}:${s}`
};

module.exports = {
    parseMillisecondsIntoReadableTime
}