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
    if (!this.coverLetter) {
      console.error("No cover letter content found!");
      return;
    }
  
    const doc = new jsPDF();
    const marginLeft = 10;
    const marginTop = 15;
    const lineHeight = 8;
    const maxWidth = 180;
    const pageHeight = doc.internal.pageSize.height - 20; // 20 for bottom margin
    let y = marginTop;
  
    const coverLetterLines = this.coverLetter.split('\n');
  
    doc.setFont("helvetica");
    doc.setFontSize(12);
  
    coverLetterLines.forEach(line => {
      let wrappedLines: string[] = [];
  
      if (line.startsWith("**") && line.endsWith("**")) {
        // Bold text handling
        doc.setFont("helvetica", "bold");
        wrappedLines = doc.splitTextToSize(line.replace(/\*\*/g, ''), maxWidth);
        doc.setFont("helvetica", "normal");
      } else if (line.startsWith("* ")) {
        // Bullet point handling
        wrappedLines = doc.splitTextToSize("• " + line.substring(2), maxWidth);
      } else {
        // Normal text with wrapping
        wrappedLines = doc.splitTextToSize(line, maxWidth);
      }
  
      // Print each wrapped line and check for page overflow
      wrappedLines.forEach((wrappedLine) => {
        if (y + lineHeight > pageHeight) {
          doc.addPage(); // Add new page
          y = marginTop; // Reset y position
        }
        doc.text(wrappedLine, marginLeft, y);
        y += lineHeight;
      });
    });
  
    doc.save("cover-letter.pdf");
  }
  
  
  
  
  
  
}