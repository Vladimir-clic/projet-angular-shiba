import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ArticleService} from '../../services/articles-service';


@Component({
  selector: 'app-connexion-page',
  imports: [ FormsModule,
    HttpClientModule],
  templateUrl: './connexion-page.html',
  styleUrl: './connexion-page.scss'
})
export class ConnexionPage {

  email: string = 'tata@gmail.com';
  password: string = '123456';
  message: string = '';

  constructor(private articleService: ArticleService) {}


  onLogin() {
    this.articleService.SendId(this.email, this.password).subscribe({
      next: (response: any) => {
        if (response.code === "200") {
          this.message = "Connexion réussie";
          window.location.href = 'http://localhost:4200';
        } else {
          this.message = "Échec de la connexion : " + response.message;
        }
      },
      error: (err) => {
        this.message = "Erreur réseau ou serveur";
        console.error('Erreur:', err);
      }
    });
  }



}
