import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

import { Trade, TradeAssets } from 'src/app/models/trade';
import { TradeService } from 'src/app/services/trade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alltrades',
  templateUrl: './alltrades.component.html',
  styleUrls: ['./alltrades.component.sass']
})
export class AlltradesComponent implements OnInit {

  trades: Observable<TradeAssets>;

  test = {
    "tradeAssets": [
      {
        "tradeId": 1,
        "account": "AA",
        "exchange": "EUREX",
        "contract": "TCH",
        "putCall": "PUT",
        "month": 0,
        "year": 0,
        "strike": 0,
        "quantity": 0,
        "buySell": 0,
        "tradeDescription": "TEST"
      }
    ]
  };


  displayedColumns: string[] = ['tradeId', 'account', 'exchange', 'contract',
    'putCall', 'month', 'strike', 'quantity', 'buySell', 'tradeDescription', 'action'];

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private routerLink: Router,
              private dialog: MatDialog,
              private tradeService: TradeService) { }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;

    this.trades = this.tradeService.getAllTrades();

    this.trades.subscribe(data => {
      console.log('Response : ' + data.tradeAssets);
      this.dataSource.data = data.tradeAssets;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCard(id: number) {
    this.tradeService.deleteTrade(id);

    this.trades.subscribe(data => {
      console.log('Response : ' + data.tradeAssets);
      this.dataSource.data = data.tradeAssets;
    });
  }

  editCard(id: number) {
    this.routerLink.navigate(['/editTrade', { tradeId: id }]);
  }
}
