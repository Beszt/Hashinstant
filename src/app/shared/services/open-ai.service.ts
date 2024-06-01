import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OpenAiVisionRequest } from './models/open-ai-vision-request';
import { OpenAiVisionResponse } from './models/open-ai-vision-response';

@Injectable()
export class OpenAiService {
  private readonly apiUrl: string = environment.Api.Uri;
  private readonly apiToken = environment.Api.Token;
  private readonly apiModel = environment.Api.Model;
  private readonly apiMaxTokens = environment.Api.maxTokens;
  private readonly promptSocialMedia = environment.Prompt.TargetSocialMedia;
  private readonly promptLanguage = environment.Prompt.Language;
  private readonly promptMaximumHashtagsCount =
    environment.Prompt.MaximumHashtagsCount;
  private readonly HashtagsDeilimiter = environment.Prompt.HashtagsDelimiter;

  constructor(private http: HttpClient) {}

  PostImageAndGetMessage(
    imagePngBase64: string
  ): Observable<string | undefined> {
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
              text:
                'Write best' +
                this.promptSocialMedia +
                ' hashtags for this picture in ' +
                this.promptLanguage +
                '. Only hashtags, Maximum ' +
                this.promptMaximumHashtagsCount +
                ', separated by "' +
                this.HashtagsDeilimiter +
                '".',
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
      .pipe(
        map((x) => x.choices[0].message.content),
        catchError(() => {
          return of('ERROR: Communication with API failed');
        })
      );
  }
}
