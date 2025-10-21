import {Component} from '@angular/core';
import ArticleService from '../../services/articles-service';
import {Article} from './article-model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-modify-article',
  imports: [
    CommonModule, FormsModule, HttpClientModule, // Http client module obligatoire pour la redirection de page
  ],
  templateUrl: './modify-article.html',
  styleUrl: './modify-article.scss'
})
export class ModifyArticlePage {

// création d'un article vide auquel on donnera les valeurs d'un article existant
  public article: Article = {
    title: '',
    desc: '',
    author: '',
    imgPath: ''
  };

  constructor(
    private articleService: ArticleService, // Importer le service avec les fonction d'appel d'api
    private activatedRoute: ActivatedRoute,
    private router: Router, // optionnel mais permet après de rediriger sur une page **
  ) {
  }
  ngOnInit(): void {
    const articleId = this.activatedRoute.snapshot.paramMap.get('id'); // récupère l'id présent dans l'url
    if (articleId) { // si l'id existe alors on récupère ses valeurs qu'on place dans l'article créer précédement
      this.articleService.getArticle(articleId).subscribe({
        next: (data: { code: number; data: any; }) => {
          console.log(data);
          if (data.code == 200) {
            this.article = data.data; // on place les valeurs
          } else {
            alert('Article introuvable');
            this.router.navigate(['/list']); // ** cette commande redirige sur /list
          }
        },
        error: (err: any) => {
          console.error(err);
          alert('Erreur lors de la récupération de l’article');
          this.router.navigate(['/article']);
        }
      });
    }
  }

// ajouter fonction onClickModify article que je te met après


onClickModifyArticle(): void {
  this.articleService.modifyArticle(this.article).subscribe({  // une fois modifiées, les valeurs de l'article récupérées sont envoyées vers l'api
    next: (data: { code: number; data: any; }) => {
      if (data.code == 200) {
        this.article = data.data
        this.router.navigate(['/confirm']);
      } else {
        alert('Erreur lors de la modification.');
      }
    },
    error: (err: any) => {
      console.error(err);

      alert('Erreur serveur.');
    }
  })
}

}
