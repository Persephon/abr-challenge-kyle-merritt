import { Injectable } from '@angular/core';
import { FishService } from '../dataServices/fish.service';
import { FishStore, IFishStore } from './fish.store';
import { Subject, takeUntil } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StoreService {
  fishStore: IFishStore;
  fishStoreChanged: Subject<IFishStore> = new Subject<IFishStore>();

  constructor(fishService: FishService) {
    let destroy$: Subject<boolean> = new Subject<boolean>();
    this.fishStore = FishStore.create({ fishes: [] });

    fishService
      .getData()
      .pipe(takeUntil(destroy$))
      .subscribe((fishes: Array<any>) => {
        this.fishStore.addFishes(fishes);
        this.fishStoreChanged.next(this.fishStore);

        destroy$.next(true);
        destroy$.unsubscribe();
      });
  }
}
