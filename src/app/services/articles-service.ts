import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles() : Observable<any> {
    return this.http.get<any>("http://localhost:3000/articles")
  }

  supprimerArticle(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/articles/${id}`);
  }

}
