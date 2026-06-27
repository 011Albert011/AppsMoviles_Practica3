import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse, ArticlesByCategoryAndPage } from '../interfaces';
import { map, Observable, of } from 'rxjs';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class News {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};

  constructor(
    private http: HttpClient
  ){}

  private executeQuery<T>( endpoint: string ){
    return this.http.get<T>(`${ apiUrl }${ endpoint }`,{
      params: {
        apiKey: apiKey,
        country: 'us',
      }
    });
  }

  getTopHeadlines(): Observable<Article[]>{
    return this.getTopHeadlinesByCategory('business');
  }

  getTopHeadlinesByCategory( category: string, loadMore: boolean = false): Observable<Article[]>{
    if (loadMore) {
      return this.getArticlesByCategory(category);
    }

    if (this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory( category: string): Observable<Article[]>{
    if (!this.articlesByCategoryAndPage[category]) {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      };
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }&page=${ page }`).pipe(
      map( ({articles}) => {
        if( articles.length === 0) return this.articlesByCategoryAndPage[category].articles;

        this.articlesByCategoryAndPage[category] = {
          page: page,
          articles: [ ...this.articlesByCategoryAndPage[category].articles, ...articles]
        };

        return this.articlesByCategoryAndPage[category].articles;
      })
    );
  }
}
