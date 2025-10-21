import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import ArticleService from '../../services/articles-service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-article-detail',
  imports: [HttpClientModule],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.scss'
})
export class ArticleDetail implements OnInit {
  articleId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupère l'ID depuis l'URL
    this.articleId = this.route.snapshot.paramMap.get('id');
  }
}
