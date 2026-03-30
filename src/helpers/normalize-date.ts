export function normalizeDate(date: Date | string) {
    const d = new Date(date);
    return new Date(
        Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
    );
}
