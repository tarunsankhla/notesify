let debouncertime;

export function debounce(callback, time) {
    window.clearTimeout(debouncertime);
    debouncertime = setTimeout(callback, time);
}