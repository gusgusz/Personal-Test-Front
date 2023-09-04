import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    const apiUrl = environment.apiUrl + '/users'; 
    return this.http.get(apiUrl);
  }


  getUser(userId: number): Observable<any> {
    const url = `${environment.apiUrl + '/users'}/${userId}`;
    return this.http.get(url);
  }

  postUser(user: any): Observable<any> {
   
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
    });

    return this.http.post(environment.apiUrl + '/users' , user, { headers });
  }

  putUser(userId: number, user: any): Observable<any> {
   
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
    });

    const url = `${environment.apiUrl + '/users'}/${userId}`;
    return this.http.put(url, user, { headers });
  }
}

