export const formatDate = (date) => {
    const d = new Date(date);

    // Array of month abbreviations
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Extract day, month, and year
    const day = d.getDate();
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();

    // Format the date string
    return `${day}. ${month} ${year}`;
}
