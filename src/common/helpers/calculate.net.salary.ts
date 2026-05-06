export function calculateNetSalary(baseSalary: number, overTimeHours: number, days_present: number, taxDeductionPercentage: number) {
    const salaryPerHour = baseSalary / 160;

    const totalWorkingHours = days_present * 8;

    const salaryForPresentDays = totalWorkingHours * salaryPerHour;

    const overTimePay = overTimeHours * salaryPerHour;

    const totalDeductions = (taxDeductionPercentage / 100) * salaryForPresentDays;

    const grossSalary = salaryForPresentDays + overTimePay;

    const netSalary = grossSalary - totalDeductions;

    

    return {netSalary, overTimePay, totalDeductions};

}