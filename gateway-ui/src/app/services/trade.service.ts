import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Trade, TradeAssets } from '../models/trade';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private http: HttpClient) { }

  getAllTrades() {
    return this.http
      .get<TradeAssets>('/readAllTrades', httpOptions).pipe(map(data => data));
  }

  addNewTrade(newTrade: any) {

    console.log('Add Trade ' + newTrade);
    const body = JSON.stringify(newTrade);

    const req = this.http
      .post('/createTrade', body,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }).subscribe(
          res => {
            console.log(res);
            console.log('New Trade added');

          },
          err => {
            console.log('Error occured' + err);
          }
        );
  }


  deleteTrade(id: number) {
    console.log('delete Trade ' + id);
    this.http.get<string>('/deleteTrade/' + id, httpOptions).subscribe();
  }
}
