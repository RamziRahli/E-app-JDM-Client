import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mot } from '../Model/Mot';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  //Spring_API_SERVER = "http://localhost:8080/api";
  Spring_API_SERVER = "https://e-app-jdm-server.herokuapp.com/";
  constructor(private httpClient: HttpClient) { }

  getMot(Mot: string, relation: string): Observable<Mot> {
    return this.httpClient.get<Mot>(`${this.Spring_API_SERVER}/word?mot=${Mot}&relation=${relation}`);
  }

  startServ() {
    return this.httpClient.get("https://jdm-server.herokuapp.com");
  }


}
