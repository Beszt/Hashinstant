import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OpenAiVisionRequest } from './models/open-ai-vision-request';
import { OpenAiVisionResponse } from './models/open-ai-vision-response';

@Injectable()
export class OpenAiService {
  private readonly apiUrl: string = environment.Api.Uri;
  private readonly apiToken = environment.Api.Token;
  private readonly apiModel = environment.Api.Model;
  private readonly apiQuestion = environment.Api.Question;
  private readonly apiMaxTokens = environment.Api.maxTokens;

  constructor(private http: HttpClient) {}

  PostImageAndGetMessage(imagePngBase64: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiToken}`,
    });

    const requestBody: OpenAiVisionRequest = {
      model: this.apiModel,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: this.apiQuestion,
            },
            {
              type: 'image_url',
              image_url: {
                url: imagePngBase64,
              },
            },
          ],
        },
      ],
      max_tokens: this.apiMaxTokens,
    };

    return this.http
      .post<OpenAiVisionResponse>(this.apiUrl, requestBody, { headers })
      .pipe(map((x) => x.choices[0].message.content),
      catchError(error => {
        console.error('Error:', error);
        return 'Something went wrong';
      }));
  }
}
