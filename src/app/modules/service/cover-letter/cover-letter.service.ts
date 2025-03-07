import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkService } from '../network.service';

@Injectable({
  providedIn: 'root'
})
export class CoverLetterService {

  private baseUrl = 'https://81fc-2409-40d1-d-6d42-e9ba-1d67-6dfa-26d4.ngrok-free.app';

  constructor(private newtworkService: NetworkService) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.newtworkService.post(`${this.baseUrl}/uploadfile`, formData);
  }

  generateCoverLetter(): Observable<any> {
    console.log('generateCoverLetter');
    return this.newtworkService.post(`${this.baseUrl}/cover-letter`, {});
  }
}
