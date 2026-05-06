import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class AgentRepository {
    constructor(private prisma: PrismaService){}


    async semanticSearchAttendances(queryVector: number[]){
        return this.prisma.$queryRaw`
            SELECT
            id,
            summary,
            embedding <-> ${queryVector}::vector AS distance
            FROM "AttendanceEmbedding"
            ORDER BY distance ASC
            LIMIT 10;
            `;
    }
    async semancticSearchPayrolls(queryVector: number[]){
        return this.prisma.$queryRaw`
            SELECT
            id,
            summary,
            embedding <-> ${queryVector}::vector AS distance
            FROM "PayrollEmbedding"
            ORDER BY distance ASC
            LIMIT 10;
            `;
    }

    async semanticSearchAttendancesAndPayrolls(queryVector: number[]){
        return this.prisma.$queryRaw`
        SELECT * FROM (
        SELECT
            id,
            summary,
            embedding <-> ${queryVector}::vector AS distance
            FROM "AttendanceEmbedding"
            
            UNION ALL
            
            SELECT
            id,
            summary,
            embedding <-> ${queryVector}::vector AS distance
            FROM "PayrollEmbedding")AS combined
            ORDER BY distance ASC
            LIMIT 10`;
    }
}
