import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FishService {

  constructor(private http: HttpClient) { }

  rootURL = 'http://localhost:5001/gofish';

  getData() {
    return this.http.get<Array<any>>(this.rootURL + '?apikey=abrradiology');
  }
}
