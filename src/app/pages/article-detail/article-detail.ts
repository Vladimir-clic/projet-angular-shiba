import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../modify-article/article-model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ArticleService from '../../services/articles-service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './article-detail.html',
  styleUrls: ['./article-detail.scss']
})
export class ArticleDetail implements OnInit {

  articleId: string | null = null;
  article: Article | null = null; // <-- nullable pour éviter les erreurs TS

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.articleId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.articleId) {
      this.loadArticle(this.articleId);
    } else {
      console.error('Aucun ID trouvé dans l’URL');
    }
  }

  private loadArticle(id: string): void {
    this.articleService.getArticleById(id).subscribe({
      next: (data) => {
        // ⚠️ data peut être n'importe quoi selon l'API, donc vérification basique
        if (data && typeof data === 'object') {
          this.article = data;
        } else {
          console.error('Réponse inattendue de l’API :', data);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l’article :', err);
      }
    });
  }

  onClickCallApi(): void {
    if (this.articleId) {
      this.loadArticle(this.articleId);
    }
  }
}
