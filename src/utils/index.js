function debounce(delay, calback) {
    let task
    return function () {
        clearTimeout(task)
        task = setTimeout(() => {
            calback.apply(this, arguments)
        }, delay)
    }
}

function generateUUID() {
    let uuid = ''
    let d = new Date().getTime()
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid
}

function time(timeStamp) {
    if (timeStamp === '') {
        return
    }
    // let timestamp = Date.parse(new Date(stringTime));
    // let time = timestamp.getFullYear()+timestamp.getMonth()+timestamp.getDate()+" "+timestamp.getHours()+":"+timestamp.getMinutes()+":"+timestamp.getSeconds();
    const date = new Date(timeStamp.replace(/-/g, '/'))
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

/**
 * 当前时间
 */
function datTime() {
    const date = new Date()
    const start = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate() + ' 00:00:00'
    const end = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate() + ' 23:59:59'
    return [time(start), time(end)]
}

export {
    debounce,
    generateUUID,
    time,
    datTime
}