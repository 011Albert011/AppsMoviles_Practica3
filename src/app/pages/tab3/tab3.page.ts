import { Component } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  get articles(): Article[]{
    return this.storageService.getLocalArticles;
  }

  constructor(private storageService: StorageService) {}

}
