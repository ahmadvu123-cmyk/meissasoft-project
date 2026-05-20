import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmbeddingService } from 'src/embeddings/embedding.service';

@Injectable()
export class PayrollAndAttendanceJobService {
    constructor(private embeddingService: EmbeddingService){}
    // @Cron('* * * * * *')
    // async cronHandler() {
    //     console.log('Cron Hit'); 
    //     await this.embeddingService.processEmbeddings();
    // }
}
