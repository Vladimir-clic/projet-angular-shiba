import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from '../pages/modify-article/article-model';

@Injectable({providedIn: 'any'})


class ArticleService {

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



  ajouterArticle(articleFromData: { title: string; desc: string; author: string }): Observable<any> {
    return this.http.post<any>("http://localhost:3000/articles/save", articleFromData);
}

// ajouter un utilisateur dans la base de donnée
  ajouterUtilisateur(userFromData: { email: string, password: string, pseudo: string, cityCode: string, city: string, phone: string,}): Observable<any> {
    return this.http.post<any>("http://localhost:3000/signup", userFromData);
  }

// reset le mot de passe
  resetPassword (email: string) : Observable<any> {
    return this.http.post<any>("http://localhost:3000/reset-password", {email});
  }

  getArticle(id:string| number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/articles/${id}`);
  }

  modifyArticle(article: Article): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/articles/${article.id}`, article);
  }
}

export default ArticleService

