import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { ImageState } from './shared/state/image.state';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(NgxsModule.forRoot([ImageState])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
  ],
};
