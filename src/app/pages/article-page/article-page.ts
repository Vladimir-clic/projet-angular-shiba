import { Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgIf, NgStyle} from '@angular/common';
import {ArticleService} from '../../services/articles-service';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-article-page',
  imports: [HttpClientModule, NgStyle, RouterLink, FormsModule, NgIf
  ],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss'
})
export class ArticlePage {

  public articles: any[] = [];

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



  articleEnModificationId: number | null = null;
  formModif = { title: '', desc: '', imgPath: '' };

  ouvrirFormulaireModification(article: any) {
    this.articleEnModificationId = article.id;
    this.formModif = {
      title: article.title,
      desc: article.desc,
      imgPath: article.imgPath
    };
  }

  validerModification(article: any) {
    this.articleService.modifierArticle(article.id, this.formModif).subscribe({
      next: () => {
        // Met à jour localement les données de l’article
        article.title = this.formModif.title;
        article.desc = this.formModif.desc;
        article.imgPath = this.formModif.imgPath;
        this.articleEnModificationId = null; // Ferme le formulaire
      },
      error: (err) => {
        console.error('Erreur lors de la modification :', err);
      }
    });
  }



}





