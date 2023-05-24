import { Component } from '@angular/core';
import { IFishStore, IRegionInfo } from '../store/fish.store';
import { StoreService } from '../store/store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  fishStore: IFishStore;

  constructor(storeService: StoreService) {
    this.fishStore = storeService.fishStore;
  }

  trackByRegionId(index: number, region: IRegionInfo){
    return region.id;
  }
}
