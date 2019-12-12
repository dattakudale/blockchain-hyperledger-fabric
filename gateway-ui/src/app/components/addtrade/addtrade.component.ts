import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Trade } from 'src/app/models/trade';
import { Observable } from 'rxjs';
import { TradeService } from 'src/app/services/trade.service';
import { Alert } from 'src/app/models/alert';


@Component({
  selector: 'app-addtrade',
  templateUrl: './addtrade.component.html',
  styleUrls: ['./addtrade.component.scss']
})
export class AddtradeComponent implements OnInit {

  alert = new Alert();

  trade: Trade;
  tradeObs: Observable<Trade>;

  form: FormGroup;

  tradeId = new FormControl();
  account = new FormControl();
  exchange = new FormControl();
  contract = new FormControl();
  putCall = new FormControl();
  month = new FormControl();
  year = new FormControl();
  strike = new FormControl();
  quantity = new FormControl();
  buySell = new FormControl();
  tradeDescription = new FormControl();

  constructor(private formBuilder: FormBuilder,
              private tradeService: TradeService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      account: [''],
      exchange: [''],
      contract: [''],
      putCall: [''],
      month: [''],
      year: [''],
      strike: [''],
      quantity: [''],
      buySell: [''],
      tradeDescription: [''],
    });
  }

  addNewTrade() {

    const newTrade = {
      account: this.account.value,
      exchange: this.exchange.value,
      contract: this.contract.value,
      putCall: this.putCall.value,
      month: this.month.value,
      year: this.year.value,
      strike: this.strike.value,
      quantity: this.quantity.value,
      buySell: this.buySell.value,
      tradeDescription: this.tradeDescription.value
    };

    this.alert = this.tradeService.addNewTrade(newTrade);
  }

}
