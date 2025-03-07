import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-cover-letter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cover-letter.component.html',
  styleUrl: './cover-letter.component.css'
})
export class CoverLetterComponent implements OnInit {
  coverLetter: string | null = null;
  formattedCoverLetter: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['coverLetter']) {
      this.coverLetter = state['coverLetter'];
      this.formatCoverLetter();
    } else {
      const navigation = history.state;
      this.coverLetter = navigation['coverLetter'];
      this.formatCoverLetter();
    }
  }

  formatCoverLetter(): void {
    if (!this.coverLetter) return;

    // Split lines and format
    this.formattedCoverLetter = this.coverLetter.split('\n').map(line => {
      // Bold text
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-700">$1</strong>');
      
      // Bullet points
      line = line.replace(/\* /g, '<span class="text-gray-700">• </span>');
      
      return line;
    });
  }


  downloadPDF(): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });
  
    const content = document.getElementById('cover-letter');
    if (!content) {
      console.error('Cover letter element not found!');
      return;
    }
  
    const options = {
      margin: [20, 20, 20, 20], // Margins: top, left, bottom, right
      html2canvas: {
        scale: 2, // Improves quality
      },
      callback: (pdf: jsPDF) => {
        // Check if content fits within one page
        const totalPages = 5
        for (let i = 1; i <= 5; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10); // Footer font size
          pdf.text(
            `Page ${i} of ${totalPages}`,
            pdf.internal.pageSize.width / 2,
            pdf.internal.pageSize.height - 10,
            { align: 'center' }
          );
        }
        pdf.save('cover-letter.pdf'); // Save the final PDF
      },
    };
  
    // Render HTML into PDF
    doc.html(content, options);
  }
  
  
  
}