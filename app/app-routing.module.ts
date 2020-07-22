import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { WinnersComponent } from './winners/winners.component';


//Here we give the paths for the components 
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'winners', component: WinnersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
