import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './Components/index/index.component';
import { ResultComponent } from './Components/result/result.component';
import { HistoryComponent } from './Components/history/history.component';
import { SuggestionComponent } from './Components/suggestion/suggestion.component';


const routes: Routes = [
  {
    path: '', component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
