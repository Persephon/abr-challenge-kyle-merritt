import { Component, OnInit } from '@angular/core';
import { IFishStore, IRegionInfo } from '../store/fish.store';
import { StoreService } from '../store/store.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IFish } from '../store/fish';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent {
  fishStore: IFishStore;
  region: IRegionInfo | undefined;
  fishesList: Array<IFish> = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private storeService: StoreService) {
    this.fishStore = storeService.fishStore;
    this.storeService.fishStoreChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe((store) => {
        this.fishStore = store;
        this.region = this.fishStore.currentRegion;

        if (!this.region) {
          console.error(`region with id ${parseInt(this.route.snapshot.params['id'])} not found`)
          return;
        } 

        this.fishesList = this.fishStore.getFishesByRegionName(this.region.name);
      })
  }

  ngOnDestroy () {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
