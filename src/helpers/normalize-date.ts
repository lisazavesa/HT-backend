export function normalizeDate(date: Date | string) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}