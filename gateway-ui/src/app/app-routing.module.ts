import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlltradesComponent } from './components/alltrades/alltrades.component';
import { AddtradeComponent } from './components/addtrade/addtrade.component';
import { EdittradeComponent } from './components/edittrade/edittrade.component';


const routes: Routes = [
  { path: '', redirectTo: 'allTrades', pathMatch: 'full' },
  { path: 'allTrades', component: AlltradesComponent, data: { title: 'All Trades' } },
  { path: 'addTrade', component: AddtradeComponent, data: { title: 'Add Trade' } },
  { path: 'editTrade', component: EdittradeComponent, data: { title: 'Edit Trade' } },

];

@NgModule({
  imports: [
            RouterModule.forRoot(
              routes,
              {
                enableTracing: false,
                useHash: true
              } // <-- debugging purposes only
            ),
        ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
