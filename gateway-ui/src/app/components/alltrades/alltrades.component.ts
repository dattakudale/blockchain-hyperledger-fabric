import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

import { Trade, TradeAssets } from 'src/app/models/trade';
import { TradeService } from 'src/app/services/trade.service';
import { Router } from '@angular/router';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';

@Component({
  selector: 'app-alltrades',
  templateUrl: './alltrades.component.html',
  styleUrls: ['./alltrades.component.scss']
})
export class AlltradesComponent implements OnInit {

  trades: Observable<TradeAssets>;

  displayedColumns: string[] = ['tradeId', 'account', 'exchange', 'contract',
    'putCall', 'month', 'strike', 'quantity', 'buySell', 'tradeDescription', 'action'];

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private routerLink: Router,
              private dialog: MatDialog,
              private loadingScreenService: LoadingScreenService,
              private tradeService: TradeService) { }

  ngOnInit() {

    this.loadingScreenService.startLoading();

    this.dataSource.paginator = this.paginator;

    this.trades = this.tradeService.getAllTrades();

    this.loadGrid();
  }

  loadGrid() {
    this.trades.subscribe(data => {
      console.log('Response : ' + data.tradeAssets);
      this.dataSource.data = data.tradeAssets;
      this.loadingScreenService.stopLoading();
    });
   }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCard(id: number) {
    this.tradeService.deleteTrade(id).subscribe( data => {
      this.loadGrid();
    });
  }

  editCard(id: number) {
    this.routerLink.navigate(['/editTrade', { tradeId: id }]);
  }
}
