import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CoverLetterService } from '../../../service/cover-letter/cover-letter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private coverLetterService: CoverLetterService, private router: Router) {}

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.coverLetterService.uploadFile(file).subscribe(
      {
        next:(response) => {
          console.log("response", response)
        }
      }
      )
    }
  }

  generateCoverLetter() {
    this.coverLetterService.generateCoverLetter().subscribe({
      next: (response) => {
        console.log("response", response);
        this.router.navigate(['/cover-letter'], { 
          state: { coverLetter: response.cover_letter } 
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error generating cover letter:', error);
        // Handle the error appropriately
      }
    });
  }
}
