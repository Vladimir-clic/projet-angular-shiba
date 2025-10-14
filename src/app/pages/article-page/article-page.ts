import { Component } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgClass, NgStyle} from '@angular/common';
import {ArticleService} from '../../services/articles-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-article-page',
  imports: [HttpClientModule, NgStyle, RouterLink
  ],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss'
})
export class ArticlePage {

  public selectedArticle: any = null;

  showDetails(article: any) {
    this.selectedArticle = this.selectedArticle === article ? null : article;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }


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

}





