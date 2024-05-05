export function todayDate() {
    const d = new Date();
    return {
        date: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear(),
    }
}

module.exports = {
    todayDate
};