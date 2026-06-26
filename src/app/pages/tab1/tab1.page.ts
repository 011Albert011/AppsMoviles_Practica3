import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { News } from 'src/app/services/news';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit{

  public articles:Article[] = [];

  constructor(
    private newService: News
  ) {}

  ngOnInit(): void{
    this.newService.getTopHeadlines()
      .subscribe( articles => this.articles.push(...articles) );
  }

}
