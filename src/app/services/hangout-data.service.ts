import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HangoutDataService {
  private data = [];
  private hangouts = [];
  constructor() { }

  setData(id, data) {
    this.data[id] = data;
  }

  getData(id) {
    return this.data[id];
  }

  setHangouts(data) {
    this.hangouts = data;
  }

  getHangout(index) {
    return this.hangouts[index];
  }

  setDid(did: any | string, hangIndex: any) {
    this.hangouts[hangIndex].did = did;
  }
}
