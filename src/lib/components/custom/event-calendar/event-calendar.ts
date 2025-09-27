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