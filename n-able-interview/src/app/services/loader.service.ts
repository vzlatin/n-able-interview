import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadCount: number = 0;
  private loadState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  loadState = this.loadState$.asObservable();

  ShowLoader() {
    this.loadCount += 1;
    this.loadState$.next(true);
  }

  HideLoader() {
    this.loadCount = this.loadCount ? --this.loadCount : 0;
    if (!this.loadCount) this.loadState$.next(false);
  }
}
