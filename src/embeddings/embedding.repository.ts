import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EmbeddingRepository {
    constructor(private prisma: PrismaService) { }
    async createAttendanceEmbeddings(summary: string, embeddings: number[]) {
        const vectorString = `[${embeddings.join(",")}]`;
        const response = await this.prisma.$queryRawUnsafe(
            `INSERT INTO "AttendanceEmbedding" (summary, embedding, "updatedAt") 
            VALUES ($1, $2::vector, NOW()) 
            RETURNING id, summary, "createdAt", "updatedAt"`,
            summary,
            vectorString
        )
        return response;
    }
    async createPayrollEmbeddings(summary: string, embeddings: number[]) {
        const vectorString = `[${embeddings.join(",")}]`;
        const response = await this.prisma.$queryRawUnsafe(
            `INSERT INTO "PayrollEmbedding" (summary, embedding, "updatedAt") 
            VALUES ($1, $2::vector, NOW()) 
            RETURNING id, summary, "createdAt", "updatedAt"`,
            summary,
            vectorString
        )
        return response;
    }
}
