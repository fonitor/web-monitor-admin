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

export {
    debounce,
    generateUUID
}