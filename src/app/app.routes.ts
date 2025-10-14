import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {InscriptionPage} from './pages/inscription-page/inscription-page';
import {ArticlePage} from './pages/article-page/article-page';
import {ArticleDetail} from './article-detail/article-detail';
import {ConnexionPage} from './connexion-page/connexion-page';


export const routes: Routes = [
  {path : 'article', component : ArticlePage},
  {path : 'inscription', component : InscriptionPage},
  {path : 'article/:id', component : ArticleDetail},
  {path : 'connexion', component : ConnexionPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
