import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { ImageState } from './shared/state/image.state';
import { OpenAiService } from './shared/services/open-ai.service';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { LanguageService } from './shared/services/language.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NgxsModule.forRoot([ImageState])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    LanguageService,
    OpenAiService
  ],
};
