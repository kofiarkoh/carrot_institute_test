import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL, LoginPayload } from '../api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: LoginPayload) {
    return this.http.post(`${BASE_URL}/auth/login`, data);
  }
}
