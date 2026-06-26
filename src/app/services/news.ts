import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces';
import { map, Observable } from 'rxjs';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class News {
  constructor(
    private http: HttpClient
  ){}

  getTopHeadlines(): Observable<Article[]>{
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/everything?q=tesla&from=2026-05-26&sortBy=publishedAt`,{
      params:{
        apiKey: apiKey
      }
    }).pipe(
      map(({articles}) => articles)
    );
  }
}
