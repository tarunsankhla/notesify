let debouncertime: number | undefined;

export const debounce = (callback, time) => {
	window.clearTimeout(debouncertime);
	debouncertime = Number(setTimeout(callback, time) ?? 0);
};
