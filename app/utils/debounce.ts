function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        if (timer) {
            clearTimeout(timer); // Clear the timer if a new call is made
        }
        timer = setTimeout(() => {
            func(...args); // Execute the function after the delay
        }, delay);
    };
}

export default debounce;
