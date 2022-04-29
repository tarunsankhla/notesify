let debouncertime: number |  undefined;

export function debounce(callback, time) {
    window.clearTimeout(debouncertime);
    debouncertime = Number(setTimeout(callback, time) ?? 0);
}