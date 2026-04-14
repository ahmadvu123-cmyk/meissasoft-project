import { BadRequestException } from '@nestjs/common';

export function compareDate(checkIn, check_out, date){

    console.log(checkIn, check_out, date);

    const finalDate = new Date(date).toISOString().split('T')[0];
    const finalCheckIn = new Date(checkIn).toISOString().split('T')[0];
    const finalCheckOut = new Date(check_out).toISOString().split('T')[0];
    
    if(finalDate != finalCheckIn) throw new BadRequestException('Date and checkIn must be of same date');
    if(finalDate != finalCheckOut) throw new BadRequestException('Date and checkOut must be of same date');
    

}