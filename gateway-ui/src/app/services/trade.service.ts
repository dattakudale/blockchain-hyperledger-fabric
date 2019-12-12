import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { TradeAssets, Trade } from '../models/trade';
import { Alert } from '../models/alert';

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

  alert = new Alert();

  constructor(private http: HttpClient) { }

  getAllTrades() {
    return this.http
      .get<TradeAssets>('/readAllTrades', httpOptions).pipe(map(data => data));
  }

  getTradeDetail(id: number) {
    return this.http
      .get<Trade>('/getTradeDetail/' + id, httpOptions);
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
            this.alert.message = 'New Trade added successfully.';
          },
          err => {
            console.log('Error occured' + err);
            this.alert.message = 'Error while adding new trade : ' + err;
          }
        );

    return this.alert;
  }


  updateTrade(updatedTrade: any) {

    console.log('Update Trade ' + updatedTrade);
    const body = JSON.stringify(updatedTrade);

    const req = this.http
      .post('/createTrade', body,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }).subscribe(
          res => {
            console.log(res);
            console.log('Trade updated');
            this.alert.message = 'Trade updated successfully.';
          },
          err => {
            console.log('Error occured' + err);
            this.alert.message = 'Error while updating trade : ' + err;
          }
        );

    return this.alert;
  }


  deleteTrade(id: number) {
    console.log('delete Trade ' + id);
    return this.http.get<string>('/deleteTrade/' + id, httpOptions);
  }
}
