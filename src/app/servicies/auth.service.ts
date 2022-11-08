import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<User>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')||'{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  signUp(user:any):any {
    return this.http.post(environment.apiUrl+'/api/auth', user);
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  signIn(user:any):any {
    return this.http.post<any>(environment.apiUrl+'/api/auth/login', user).pipe(
      map(user =>{
        if(user){
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({});
  }
  

}
