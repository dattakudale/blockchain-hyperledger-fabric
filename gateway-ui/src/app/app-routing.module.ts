import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlltradesComponent } from './components/alltrades/alltrades.component';


const routes: Routes = [
  { path: '', redirectTo: 'allTrades', pathMatch: 'full' },
  { path: 'allTrades', component: AlltradesComponent, data: { title: 'All Trades' } },
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
