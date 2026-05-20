import { Injectable, NotFoundException } from '@nestjs/common';
import { AttendanceRepository } from 'src/attendance/attendance.repository';
import { PayrollRepository } from 'src/payroll/payroll.repository';
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { createAttendanceSummary } from 'src/common/helpers/create.attendace.summary';
import { EmbeddingRepository } from './embedding.repository';
import { createPayrollSummaries } from 'src/common/helpers/create.payroll.summary';

@Injectable()
export class EmbeddingService {
    private genAI: GoogleGenerativeAI;
    private model: GenerativeModel;
    constructor(private payrollRepo: PayrollRepository, private attendanceRepo: AttendanceRepository,
        private embeddingRepo: EmbeddingRepository
    ) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new NotFoundException('API Key is not defined in env');
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-embedding-2",
        })
    }

    async createAttendanceEmbeddings() {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0)
        const attendanceRecords = await this.attendanceRepo.findAllAttendacnes(startOfToday);
        const attendanceSummaries = await createAttendanceSummary(attendanceRecords);
        for (let summary of attendanceSummaries) {
            let embeddings = await this.model.embedContent(summary);
            await this.embeddingRepo.createAttendanceEmbeddings(summary, embeddings.embedding.values);
        }
    }
    async createPayrollEmbeddings() {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const allPyarolls = await this.payrollRepo.findAllPayrolls(startOfToday);
        const payrollSummaries = createPayrollSummaries(allPyarolls);
        for (let summary of payrollSummaries) {
            let embeddings = await this.model.embedContent(summary);
            await this.embeddingRepo.createPayrollEmbeddings(summary, embeddings.embedding.values);
        }
    }

    async processEmbeddings() {
        await this.createAttendanceEmbeddings();
        await this.createPayrollEmbeddings();
    }
}

