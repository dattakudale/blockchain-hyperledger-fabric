import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trade } from 'src/app/models/trade';
import { TradeService } from 'src/app/services/trade.service';

@Component({
  selector: 'app-alltrades',
  templateUrl: './alltrades.component.html',
  styleUrls: ['./alltrades.component.sass']
})
export class AlltradesComponent implements OnInit {

  trades: Observable<Trade[]>;
  constructor(private tradeService: TradeService) { }

  ngOnInit() {
    this.trades = this.tradeService.getAllTrades();

    this.trades.subscribe();
  }

}
