import { Component, OnInit } from '@angular/core';
import { IFishStore } from './store/fish.store';
import { StoreService } from './store/store.service';
import { IFish } from './store/fish';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'abr-challenge-kyle-merritt';
}
