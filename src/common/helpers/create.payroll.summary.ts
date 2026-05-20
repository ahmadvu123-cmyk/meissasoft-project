export function createPayrollSummaries(records: any[]) {
  const summaries: string[] = [];
  for (const data of records) {
    const summary = `
            Worker ID: ${data.worker_id}

            Worker Name: ${data.worker.name}

            Period:
            Month: ${new Date(data.month).toDateString()}
            Year: ${new Date(data.year).getFullYear()}

            Salary:
            Base: ${data.base_salary}
            Net: ${data.net_salary}
            Currency: ${data.currency}

            Attendance:
            Present: ${data.days_present}/${data.total_working_days}
            Absent: ${data.absent_days}

            Overtime:
            Hours: ${data.overtime_hours}
            Pay: ${data.overtime_pay}

            Deductions: ${data.total_deductions}

            Payment Status: ${data.payment_status}
                `.trim();

    summaries.push(summary);
  }
  return summaries;
}