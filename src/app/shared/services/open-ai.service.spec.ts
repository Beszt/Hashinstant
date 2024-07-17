import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OpenAiService } from './open-ai.service';
import { Image } from '../models/Image';
import { OpenAiVisionResponse } from './models/open-ai-vision-response';
import { environment } from '../../../environments/environment';

describe('OpenAiService', () => {
  let service: OpenAiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OpenAiService]
    });

    service = TestBed.inject(OpenAiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a filtered hashtags on PostImageAndGetMessage', () => {
    const mockImage: Image = { Src: 'http://example.com/image.jpg', Hashtags: '', HashtagsLanguage: 'en' };
    const mockResponse: OpenAiVisionResponse = {
      id: '1',
      object: 'text_completion',
      created: 1234567890,
      model: 'test-model',
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: '#example    #test some bad text #tagswithout#space #duplicate #foo #PoKeMoN #duplicate #bar #wrongh@shtag   text'
          },
          logprobs: null,
          finish_reason: 'stop'
        }
      ],
      usage: {
        prompt_tokens: 5,
        completion_tokens: 5,
        total_tokens: 10
      },
      system_fingerprint: 'system-fingerprint'
    };

    service.PostImageAndGetHashtags(mockImage).subscribe((response) => {
      expect(response).toContain('#' + environment.AppName.toLowerCase());

      let refinedReponse = response?.replace('#' + environment.AppName.toLowerCase(), '').replace('  ', ' ').trim();
    
      expect(refinedReponse).toBe('#example #test #tagswithout #space #duplicate #foo #pokemon #bar');
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service['apiToken']}`);

    req.flush(mockResponse);
  });
});
