import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'FullDate',
})
@Injectable()
export class FullDatePipe implements PipeTransform {
    // DateFormatPipe
    // Show moment.js dateFormat for time elapsed.
    transform(date: any, args?: any): any {
        return moment(new Date(date)).calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'ddd, DD MMM, YY'
        });
    }
}

@Pipe({
    name: 'FullDateMilli',
})
@Injectable()
export class FullDateMilliPipe implements PipeTransform {
    // DateFormatPipe
    // Show moment.js dateFormat for time elapsed.
    transform(date: any, args?: any): any {
        return moment(new Date(parseInt(date, 10))).calendar(null, {
            sameDay: '[Today]',
            lastDay: '[Yesterday]',
            sameElse: 'DD-MM-YYYY'
        });
    }
}
