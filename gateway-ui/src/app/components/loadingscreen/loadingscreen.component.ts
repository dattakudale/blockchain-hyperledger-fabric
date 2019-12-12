import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingScreenService } from 'src/app/services/loading-screen.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loadingscreen',
  templateUrl: './loadingscreen.component.html',
  styleUrls: ['./loadingscreen.component.scss']
})
export class LoadingscreenComponent implements OnInit, OnDestroy {

  loading = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingScreenService) {
  }

  ngOnInit() {

    console.log('Loading screen component started');
    this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe(
      debounceTime(200)
    ).subscribe((value) => {
      console.log('Loading subscribed value ' + value);
      this.loading = value;
    });

  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
