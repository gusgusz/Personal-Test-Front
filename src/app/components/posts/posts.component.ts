import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { LoadingService } from '../loading/loading.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  newPost: any = {
    title: '',
    body: ''
  };

  constructor(
    private postsService: PostsService,
    private loadingService: LoadingService
  ) {}

  loading$!: Observable<boolean>;
  search: string = "";
  step: number = 0; 

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    if (this.posts.length === 0) {
      this.loading$ = this.loadingService.loading$;
      this.loadingService.show();
    }
    this.postsService.getPosts().subscribe((data: any) => {
      this.posts = data;
      this.loadingService.hide();
    });
  }

  searchPosts(search: string) {
    if (search.length >= 3) {
      this.loading$ = this.loadingService.loading$;
      this.loadingService.show();
      this.postsService.searchPostsTitle(search).subscribe((data: any) => {
        this.posts = data;
        this.loadingService.hide();
      });
    }
  }

  createPost(post: any) {
    this.postsService.createPost(post).pipe(
      catchError((error) => {
        console.error('Ocorreu um erro ao criar a postagem:', error);
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.posts.unshift(post);
      this.newPost = { title: '', body: '' };
    });
  }

  updatePost(postId: number, post: any) {
    this.postsService.updatePost(postId, post).pipe(
      catchError((error) => {
        console.error('Ocorreu um erro ao atualizar a postagem:', error);
        return throwError(() => error);
      })
    ).subscribe((data: any) => {
      const updatedPosts = this.posts.map((p) => (p.id === postId ? data : p));
      this.posts = updatedPosts;
    });
  }

  deletePost(postId: number) {
    this.postsService.deletePost(postId).pipe(
      catchError((error) => {
        console.error('Ocorreu um erro ao excluir a postagem:', error);
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== postId);
    });
  }

  toggleEditMode(post: any) {
    post.isEditing = !post.isEditing;
  }

  executeEditAndPut(post: any) {
    this.toggleEditMode(post);
    this.updatePost(post.id, post);
  }
}
