import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChampsService {

  constructor(private http: HttpClient) { }

  getStandings(nLink:string){
    console.log(nLink);
    return this.http.get(nLink)

  }
}
