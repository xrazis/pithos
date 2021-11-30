const debounce = (callback, delay = 1000) => {
    let timeoutid;
    return (...args) => {
        if (timeoutid)
            clearTimeout(timeoutid);
        timeoutid = setTimeout(() => {
            callback.apply(null, args);
        }, delay);
    };
};