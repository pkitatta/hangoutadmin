import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // Development url
  // API_URL = 'https://devadmin.plotavenue.com/api/';
  // Production url
  API_URL = 'https://admin.plotavenue.com/api/';
  constructor() { }
}
