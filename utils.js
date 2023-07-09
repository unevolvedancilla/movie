const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => { //return a closure 
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay)
    }
}