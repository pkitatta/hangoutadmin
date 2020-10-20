import { Injectable, Pipe, PipeTransform } from '@angular/core';
import {Observable} from 'rxjs';
import {DocumentData} from '@angular/fire/firestore';

@Pipe({
    name: 'orderDeliveredFilter'
})
@Injectable()
export class OrderDeliveredPipe implements PipeTransform {
    // ConversationPipe
    // Filter orderDelivery based on friend's name or username.
    // transform(orderDeliveries: any[], delivered: boolean): any {
    //     if (!orderDeliveries) {
    //         return;
    //     } else {
    //         return orderDeliveries.filter(orderDelivery => orderDelivery.delivered === delivered);
    //     }
    // }

    transform(orderDeliveries: Observable<DocumentData[]>, delivered: boolean) {
        if (!orderDeliveries) {
            return;
        } else {
            let finalDel = [];
            orderDeliveries.subscribe((order) => {
                finalDel = [];
                order.forEach((ord) => {
                    console.log('ord: ' + ord.section);
                    if (ord.delivered === delivered) {
                        finalDel.push(ord);
                    }
                });
            });
            return finalDel;
        }
    }
}
