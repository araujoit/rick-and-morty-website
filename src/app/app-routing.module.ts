import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { LocationsComponent } from './locations/locations.component';
import { EpisodesComponent } from './episodes/episodes.component';

const routes: Routes = [
  { path: 'characters', component: CharactersComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'episodes', component: EpisodesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
