import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../servicies/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const authToken = this.authService.currentUserValue;
    if(authToken){
      req = req.clone({
        setHeaders:{
          Authorization:`Bearer ${authToken.token}`
        }
      })
    }
    return next.handle(req);
  }
}
