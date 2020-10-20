import { Injectable } from '@angular/core';
import {HangoutDataService} from '../services/hangout-data.service';
import {ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HangoutResolverService {

  constructor(
      private service: HangoutDataService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    // return this.service.getData(id);
    return this.service.getHangout(id);
  }
}
