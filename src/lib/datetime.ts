export function formatDigitalTime(hour: number, minute: number): string {
    const hh = String(hour).padStart(2, '0');
    const mm = String(minute).padStart(2, '0');
    return `${hh}:${mm}`;
}

export function formatDigitalTimeByMinutes(minutes: number): string {
    return formatDigitalTime((Math.floor(minutes / 60)), (minutes % 60));
}