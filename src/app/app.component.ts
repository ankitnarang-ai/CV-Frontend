import { Component } from '@angular/core';
import { NavbarComponent } from './modules/applications/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cv-frontend';
}
