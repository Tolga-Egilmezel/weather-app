import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import './app.scss';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
