import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiBaseInterceptor } from './core/interceptors/api-base.interceptor';

/**
 * PUBLIC_INTERFACE
 * API_BASE_URL is the base URL for REST API calls. This should be configured via environment or deployment settings.
 */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  factory: () => {
    // Use globalThis to safely access the global object in both browser and node
    const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : undefined;
    const browserInjected = g && g.__API_BASE_URL__;
    if (browserInjected) {
      return browserInjected as string;
    }
    const envVal = typeof process !== 'undefined' ? (process.env['API_BASE_URL'] as string | undefined) : undefined;
    return envVal ?? '/api';
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([apiBaseInterceptor])),
  ],
};
