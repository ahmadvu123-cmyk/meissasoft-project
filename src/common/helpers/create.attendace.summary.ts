export async function createAttendanceSummary(records: any[]) {
    const userMap = new Map();
    for (const r of records) {
        const name = r.worker.name;
        const date = r.date.toLocaleDateString('en-CA');
        const key = `${name}${date}`;
        if (!userMap.has(key)) {
            userMap.set(key, {
                name,
                date,
                present: 0,
                absent: 0,
                totalHours: 0,
                overtimeHours: 0,
                days: 0,
            });
        }
        const user = userMap.get(key);
        user.days++;
        if (r.attendance_status === 'PRESENT') {
            user.present++;
            user.totalHours += r.total_hours || 0;
            user.overtimeHours += r.overtime_hours || 0;
        }
        if (r.attendance_status === 'ABSENT') {
            user.absent++;
        }
    }
    const summaries: string[] = [];
    userMap.forEach((val, key) => {
        summaries.push(
            `${val.name} on ${val.date} attended ${val.present} days, absent ${val.absent} days, worked ${val.totalHours} hours with ${val.overtimeHours} hours overtime across ${val.days} records.`
        );
    });
    return summaries;
}