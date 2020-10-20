import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({name: 'MediaGroup'})
export class MediaGroupPipe implements PipeTransform {
    pipe = new DatePipe('en-US'); // Use your own locale
    transform(collection: any[], property: string): any[] {
        // let property = 'item_category';
        // prevents the application from breaking if the array of objects doesn't exist yet
        if (!collection) {
            return null;
        }

        const groupedCollection = collection.reduce((previous, current) => {
            // console.log('property: ' + this.pipe.transform(current[property], 'yyyy-MM-dd'));
            // console.log('property: ' + typeof current[property]);
            if (!previous[this.pipe.transform(current[property], 'yyyy-MM-dd')]) {
                previous[this.pipe.transform(current[property], 'yyyy-MM-dd')] = [current];
            } else {
                previous[this.pipe.transform(current[property], 'yyyy-MM-dd')].push(current);
            }

            return previous;
        }, {});

        // this will return an array of objects, each object containing a group of objects
        return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
    }
}
