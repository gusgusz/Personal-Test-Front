import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {}

  

  getPosts() {
    const apiUrl = environment.apiUrl + '/posts';
    return this.http.get(apiUrl);
  }

  createPost(post: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
    });
    return this.http.post(environment.apiUrl + '/posts', post, { headers });
  }

  updatePost(postId: number, post: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
    });
    const url = `${environment.apiUrl + '/posts'}/${postId}`;
    return this.http.put(url, post, { headers });
  }

  deletePost(postId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + environment.token,
    });
    const url = `${environment.apiUrl}/posts/${postId}`;
    return this.http.delete(url, { headers });
  }

  searchPostsTitle(search: string){
    const url = `${environment.apiUrl + '/posts?title='+ search}`;
    return this.http.get(url);
  }

  searchByUserName(name: string){
    const url = `${environment.apiUrl + '/users?name='+ name}`;
    return this.http.get(url);
  }
}
