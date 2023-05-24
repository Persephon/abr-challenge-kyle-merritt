import { Component } from '@angular/core';
import { IFishStore, IRegionInfo } from '../store/fish.store';
import { StoreService } from '../store/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  fishStore: IFishStore;

  constructor(storeService: StoreService) {
    this.fishStore = storeService.fishStore;
  }

  trackByRegionId(index: number, region: IRegionInfo){
    return region.id;
  }
}
