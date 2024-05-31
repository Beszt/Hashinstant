# Hashinstant
Simple but powerful (powered by OpenAI) hashtags generator for Instagram images / photos.

Live demo is available here [Hashinstant](http://hashinstant.obisoft.pl).

## Technology stack
- Angular 18 (TypeScript)
- NGXS (Store)
- RxJS (Reactive)
- Tailwind (CSS Styling)
- OpenAI API

## Installation
1. Install newest **Node.JS**
2. Duplicate `environment.ts` to `environment.dev.ts` and paste your OpenAI token to `Token` property.
3. Type `npm install -g @angular/cli` `npm install --legacy-peer-deps` and `ng serve`