import { Injectable, OnModuleInit, OnModuleDestroy, HttpException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async onModuleInit() {
		try {
			await this.$connect();
		} catch (error: any) {
			console.error('Databse connection failed', error?.message);
		}
	}

	async onModuleDestroy() {
		try {
			await this.$disconnect();
		} catch (error: any) {
			console.error('Failed to disconnect DB', error?.message);
		}
	}
}
