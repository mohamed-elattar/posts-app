import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() {}
  getToken() {
    return window.localStorage.getItem('jwtToken');
  }
  setToken(token: string) {
    window.localStorage.setItem('jwtToken', token);
  }
  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }
}
