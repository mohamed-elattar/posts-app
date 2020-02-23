import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../core/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      Accept: 'application/json'
    };

    const authToken = this.jwtService.getToken();

    if (authToken) {
      headersConfig['Authorization'] = `Token ${authToken}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
