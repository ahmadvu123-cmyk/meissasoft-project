export function checkPayrollInMonth(year) {
    const extractedYear = new Date(year).getFullYear();
    const extractedMonth = new Date(year).getMonth();
    const start = new Date(extractedYear, extractedMonth, 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(extractedYear, extractedMonth + 1, 0);
    end.setHours(23, 59, 59, 999);
    return {
        start,
        end,
        month: extractedMonth + 1,
        year: extractedYear
    };
}