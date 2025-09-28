
export interface Time {
    digital: string,
    minutes: number
}

export function formatDigitalTime(hour: number, minute: number): string {
    const hh = String(hour).padStart(2, '0');
    const mm = String(minute).padStart(2, '0');
    return `${hh}:${mm}`;
}

export function formatDigitalTimeByMinutes(minutes: number): string {
    return formatDigitalTime((Math.floor(minutes / 60)), (minutes % 60));
}

export function getTimeIntervalls(hours: number, intervalls: number): Time[] {
    const minute = hours * 60;
    const times: Time[] = [];
    for (let minutes = 0; minutes < minute; minutes += intervalls) {
        let digital = formatDigitalTimeByMinutes(minutes)
        times.push({ digital: digital, minutes: minutes })
    }
    return times
}
