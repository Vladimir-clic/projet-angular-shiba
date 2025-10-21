import { Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgIf, NgStyle} from '@angular/common';
import ArticleService from '../../services/articles-service';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-page',
  imports: [HttpClientModule, NgStyle, RouterLink, FormsModule, NgIf
  ],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss'
})
export class ArticlePage {

  public articles: any[] = [];
  message: string = ''
  constructor(private articleService: ArticleService) {
  }



  onClickCallApi() {
    this.articleService.getArticles().subscribe({
      // data ici est le JSON TOUT EN ENTIER
      next: data => {
        // Si le code métier dans le json de l'api est valide
        if (data.code == "200") {
          // Mettre à jour les films
          // Pourquoi data.data car :
          // - data tout le json
          // - dans ce json nous avaons (code, message, data : la liste des films)
          this.articles = data.data;
        }
      }
    })

  }

  supprimerArticle(id: number): void {
    this.articleService.supprimerArticle(id).subscribe({
      next: () => {
        // Filtrer la liste locale pour retirer l’article supprimé
        this.articles = this.articles.filter(article => article.id !== id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
      }
    })
  }

formVisible = false;
  affichierFormulaire(){
    this.formVisible = true;
  }



formAjoutArticle = {
    title:'',
    desc:'',
    author:'',
};

  ajouterArticle() {
    if (!this.formAjoutArticle.title || !this.formAjoutArticle.desc) {
      console.warn("Le titre et la description sont obligatoires");
      this.message = "Le titre et la description sont obligatoires"
      return;
    }


    this.articleService.ajouterArticle(this.formAjoutArticle).subscribe({
      next: (nouvelArticle) => {
        console.log("Article ajouté :", nouvelArticle);
        this.articles.push(nouvelArticle); // mise à jour de la liste locale
        this.message = `Article ${this.formAjoutArticle.title} ajouté avec succès`;
        // reset du formulaire
        this.formAjoutArticle = { title: '', desc: '', author: '' };
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout de l'article :", err);
        this.message = "Erreur lors de l'ajout";
      }
    });

  }
  protected readonly indexedDB = indexedDB;
}





