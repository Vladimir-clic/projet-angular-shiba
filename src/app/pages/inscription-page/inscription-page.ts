import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import ArticleService from '../../services/articles-service';
import { HttpClientModule } from '@angular/common/http';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-inscription-page',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
  templateUrl: './inscription-page.html',
  styleUrl: './inscription-page.scss'
})
export class InscriptionPage {

  message: string = '';
  public user: any[] = [];
  constructor(private articleService: ArticleService) {
  }

  formAjoutUser = {
    email:'',
    password:'',
    passwordConfirm: '',
    pseudo: '',
    cityCode: '',
    city: '',
    phone: '',

  };

  ajouterUtilisateur() {
    if (!this.formAjoutUser.email ||
      !this.formAjoutUser.password ||
      !this.formAjoutUser.passwordConfirm ||
      !this.formAjoutUser.pseudo ||
      !this.formAjoutUser.cityCode ||
      !this.formAjoutUser.city ||
      !this.formAjoutUser.phone) {
      console.warn("Le mot de passe et le mail sont obligatoire");
      this.message = "Le mot de passe et le mail sont obligatoire";
      return;
    }

    if(!(this.formAjoutUser.password == this.formAjoutUser.passwordConfirm)) {
      console.warn("Le mot de passe et le passe et le passwordConfirm sont différent");
      this.message = "Le mot de passe et le passe et le passwordConfirm sont différent";
      return;
    }

    this.articleService.ajouterUtilisateur(this.formAjoutUser).subscribe({
      next: (newUser: any) => {
        console.log("Article ajouté :", newUser);
        this.user.push(newUser); // mise à jour de la liste locale
        this.message = `Utilisateur ${this.formAjoutUser.pseudo} ajouté avec succès`;
        // reset du formulaire
        this.formAjoutUser = { email:'',password:'', passwordConfirm: '', pseudo:'', cityCode:'', city:'', phone:'', };
      },
      error: (err: any) => {
        console.error("Erreur lors de l'ajout de l'article :", err);
        this.message = "Erreur lors de l'ajout";
      }
    });
  }



}
