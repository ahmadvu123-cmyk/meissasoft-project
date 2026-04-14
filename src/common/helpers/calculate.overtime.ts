export async function calculateOverTime(check_in, check_out) {

        const startTime = new Date(check_in);
        const endTime = new Date(check_out);
        const difference = endTime.getTime() - startTime.getTime();
        const hours = difference / (1000 * 60 * 60);
        return Number(hours.toFixed(1));
        
}