import { Routes } from '@angular/router';
import { HomeComponent } from './modules/applications/components/home/home.component';
import { AboutComponent } from './modules/applications/components/about/about.component';
import { ContactComponent } from './modules/applications/components/contact/contact.component';
import { CoverLetterComponent } from './modules/applications/components/cover-letter/cover-letter.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactComponent },
  {path: 'cover-letter', component: CoverLetterComponent},
  { path: '**', redirectTo: '' } // Wildcard route for 404 handling
];