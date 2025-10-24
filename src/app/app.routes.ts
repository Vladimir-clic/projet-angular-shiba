import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {InscriptionPage} from './pages/inscription-page/inscription-page';
import {ArticlePage} from './pages/article-page/article-page';
import {ArticleDetail} from './pages/article-detail/article-detail';
import {ConnexionPage} from './pages/connexion-page/connexion-page';
import {ModifyArticlePage} from './pages/modify-article/modify-article';
import {OubliPage} from './pages/oubli-page/oubli-page';


export const routes: Routes = [
  {path : 'article', component : ArticlePage},
  {path : 'inscription', component : InscriptionPage},
  {path : 'article/:id', component : ArticleDetail},
  {path : 'connexion', component : ConnexionPage},
  {path : 'modify/:id', component : ModifyArticlePage},
  {path : 'motdepasseoublie', component : OubliPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
