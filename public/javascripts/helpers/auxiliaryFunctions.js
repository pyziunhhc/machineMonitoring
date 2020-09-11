

const parseMillisecondsIntoReadableTime = (milliseconds) => {
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
const dragMouseDown = (e, container) => {
    let pos1 = 0,
        pos2 = 0,
        pos3 = e.clientX,
        pos4 = e.clientY;


    function moveObject(e) {
        e.stopPropagation();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        container.style.top = `${(container.offsetTop - pos2)}px`
        container.style.left = `${(container.offsetLeft - pos1)}px`
    }

    function removeMove() {
        container.onmouseup = null;
        container.onmousemove = null;
    }
    container.onmousemove = moveObject;
    container.onmouseup = removeMove;
}

export default {
    parseMillisecondsIntoReadableTime,
    dragMouseDown,
}