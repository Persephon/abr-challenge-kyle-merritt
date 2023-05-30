import { Injectable } from '@angular/core';
import { FishService } from '../dataServices/fish.service';
import { FishStore, IFishStore } from './fish.store';
import { Subject, takeUntil } from 'rxjs';
import * as router from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StoreService {
  fishStore: IFishStore;
  fishStoreChanged: Subject<IFishStore> = new Subject<IFishStore>();

  constructor(fishService: FishService, router: router.Router) {
    let destroy$: Subject<boolean> = new Subject<boolean>();
    this.fishStore = FishStore.create({
      fishes: [],
      route: {
        name: 'home',
        parameter: null,
      },
    });

    fishService
      .getData()
      .pipe(takeUntil(destroy$))
      .subscribe((fishes: Array<any>) => {
        this.fishStore.addFishes(fishes);
        this.fishStoreChanged.next(this.fishStore);

        destroy$.next(true);
        destroy$.unsubscribe();
      });

    router.events.subscribe(() => {
      if (
        this.fishStore.route.name === window.location.pathname.split('/')[1] &&
        this.fishStore.route.parameter ===
          window.location.pathname.split('/')[2]
      ) {
        return;
      }

      this.fishStore.route.setRoute(window.location.pathname);
      this.fishStoreChanged.next(this.fishStore);
    });
  }
}
