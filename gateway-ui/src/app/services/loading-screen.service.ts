import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  loadingStatus: Subject<boolean> = new Subject();

  startLoading() {
    console.log('Setting true for loading');
    this.loadingStatus.next(true);
  }

  stopLoading() {
    console.log('Setting false for loading');
    this.loadingStatus.next(false);
  }
}
