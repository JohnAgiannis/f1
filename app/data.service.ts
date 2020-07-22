import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getSeasons() {
    return this.http.get('http://ergast.com/api/f1/seasons.json?limit=400')
  }


}
