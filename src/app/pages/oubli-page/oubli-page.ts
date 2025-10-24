import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import ArticleService from '../../services/articles-service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-oubli-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './oubli-page.html',
  styleUrl: './oubli-page.scss'
})
export class OubliPage {
    mdp: string = ''
    message = ''
  email: string = '';

  constructor(private articleService: ArticleService) {
  }



// Appel Api
  getPassword(){
      this.articleService.resetPassword(this.email).subscribe({
        next: (data) => {
          if (data.code == 200) {
            this.mdp = data.data;
            this.message = `Votre nouveau mot de passe est : ${this.mdp}`;
          }else{
            this.message = "Une erreur est survenue !";
          }
        },
        error: (err) => {
          console.error(err);
          this.message = "Erreur lors de la réinitialisation du mot de passe";
        }
      });
  }

}
