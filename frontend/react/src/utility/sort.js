export function sortEntries(entries) {
    const newEntries = [...entries];
    newEntries.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    return newEntries;
}

export function sortByDate(entries) {
    const newEntries = [...entries];
    newEntries.sort((a, b) => new Date(a) - new Date(b));
    return newEntries;
}