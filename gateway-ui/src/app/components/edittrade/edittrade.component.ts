import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { TradeService } from 'src/app/services/trade.service';
import { ActivatedRoute } from '@angular/router';
import { Trade } from 'src/app/models/trade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edittrade',
  templateUrl: './edittrade.component.html',
  styleUrls: ['./edittrade.component.scss']
})
export class EdittradeComponent implements OnInit {

  alert = new Alert();

  tradeObs: Observable<Trade>;

  selectedTrade: number;

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
              private route: ActivatedRoute,
              private tradeService: TradeService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      tradeId: [''],
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

    this.selectedTrade = this.route.snapshot.params.tradeId;

    console.log('selected : ' + this.selectedTrade);
    this.tradeObs = this.tradeService.getTradeDetail(this.selectedTrade);

    this.tradeObs.subscribe(
      (data => {
        console.log('selected data : ' + data.tradeId);
        this.form.patchValue(data);
      })
    );
  }

  editTrade() {

    const updatedTrade = {
      tradeId: this.form.controls.tradeId.value,
      account: this.form.controls.account.value,
      exchange: this.form.controls.exchange.value,
      contract: this.form.controls.contract.value,
      putCall: this.form.controls.putCall.value,
      month: this.form.controls.month.value,
      year: this.form.controls.year.value,
      strike: this.form.controls.strike.value,
      quantity: this.form.controls.quantity.value,
      buySell: this.form.controls.buySell.value,
      tradeDescription: this.form.controls.tradeDescription.value
    };

    this.alert = this.tradeService.updateTrade(updatedTrade);

  }

}
