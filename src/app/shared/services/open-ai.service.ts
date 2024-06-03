import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OpenAiVisionRequest } from './models/open-ai-vision-request';
import { OpenAiVisionResponse } from './models/open-ai-vision-response';
import { Image } from '../models/Image';

@Injectable()
export class OpenAiService {
  private readonly apiUrl: string = environment.Api.Uri;
  private readonly apiToken = environment.Api.Token;
  private readonly apiModel = environment.Api.Model;
  private readonly apiMaxTokens = environment.Api.maxTokens;
  private readonly promptSocialMedia = environment.Prompt.TargetSocialMedia;
  private readonly promptDefaultLanguage = environment.Prompt.DefaultLanguage;
  private readonly promptMaximumHashtagsCount =
    environment.Prompt.MaximumHashtagsCount;
  private readonly HashtagsDeilimiter = environment.Prompt.HashtagsDelimiter;

  constructor(private http: HttpClient) {}

  PostImageAndGetMessage(image: Image): Observable<string | undefined> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiToken}`,
    });

    const hashtagsLanguage =
      image.HashtagsLanguage != undefined
        ? (image.HashtagsLanguage as string)
        : this.promptDefaultLanguage;

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
                hashtagsLanguage +
                '. Only hashtags, Maximum ' +
                this.promptMaximumHashtagsCount +
                ', separated by "' +
                this.HashtagsDeilimiter +
                '".',
            },
            {
              type: 'image_url',
              image_url: {
                url: image.Src as string,
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
