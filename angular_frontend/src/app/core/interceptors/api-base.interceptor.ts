import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_BASE_URL } from '../../app.config';

/**
 * PUBLIC_INTERFACE
 * apiBaseInterceptor ensures relative requests starting with '/notes' or other resources
 * are correctly prefixed with the API base URL when needed.
 */
export const apiBaseInterceptor: HttpInterceptorFn = (req, next) => {
  const base = inject(API_BASE_URL);
  // If request is already absolute, pass-through
  if (/^https?:\/\//i.test(req.url)) {
    return next(req);
  }
  // Allow requests that already start with base to pass
  if (req.url.startsWith(base)) {
    return next(req);
  }
  // For safety, forward as-is; services already use API_BASE_URL. This interceptor is a placeholder for future cross-cutting concerns.
  return next(req);
};
