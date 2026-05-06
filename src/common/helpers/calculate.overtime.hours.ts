type Attendance = {
        overtime_hours: number | null
    }


export function calculateOverTimeHours(attendances: Attendance[]){

    return attendances.reduce((total, att) => total + (att.overtime_hours || 0), 0);

}