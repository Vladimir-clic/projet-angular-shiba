import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'any'})


export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles() : Observable<any> {
    return this.http.get<any>("http://localhost:3000/articles")
  }




  supprimerArticle(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/articles/${id}`);
  }




  SendId(email: string, password: string){
    return this.http.post('http://localhost:3000/login', {email, password});
  }


  modifierArticle(id: number, data: any): Observable<any> {
    return this.http.patch(`http://localhost:3000/articles/${id}`, data);
  }


}

