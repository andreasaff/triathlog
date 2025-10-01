export function getDateOfDay(startDate: Date, index: number): Date {
    const date = new Date(startDate);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + index);
    return date;
}

export function moveWeek(startDate: Date, offset: number): Date {
    const date = new Date(startDate);
    date.setDate(date.getDate() + offset);
    return date;
}

export function isValidHex(hex: string): boolean {
    const regex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
    return regex.test(hex);
}