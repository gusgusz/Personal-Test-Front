import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from './posts.service';
import { LoadingService } from '../loading/loading.service';
import { Observable, throwError, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  takeUntil
} from 'rxjs/operators';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit, OnDestroy {
  
  posts: any[] = [];
  newPost: any = {
    user_id: 0,
    title: '',
    body: ''
  };

  userSearch = '';
  userSuggestions: any[] = [];

  userFormControl = new FormControl();
  private unsubscribe$ = new Subject<void>(); // Corrigir o tipo de Subject

  constructor(
    private postsService: PostsService,
    private loadingService: LoadingService
  ) {}

  loading$!: Observable<boolean>;
  search: string = '';
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

  displayUser(user: string): string {
    return user ? user : '';
  }

  onOptionSelected(event: any): void {
    this.newPost.user_id = event.option.value.id; 
    this.userSearch = event.option.value.name; 
  }

  onUserSearch() {
    const searchTerm = this.userSearch.toLowerCase();

    this.userFormControl.setValue(this.userSearch);

    this.postsService
      .searchByUserName(searchTerm)
      .pipe(
        debounceTime(300),
        catchError((error) => {
          console.error('Ocorreu um erro na pesquisa de usuário:', error);
          return throwError(() => error);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: any) => {
        this.userSuggestions = data;
        this.loadingService.hide();
        console.log(data, "oi");
      });
  }

  createPost(post: any) {
    this.postsService
      .createPost(post)
      .pipe(
        catchError((error) => {
          console.error('Ocorreu um erro ao criar a postagem:', error);
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.posts.unshift(post);
        this.newPost = { title: '', body: '' };
        this.userSearch = '';
      });
  }

  updatePost(postId: number, post: any) {
    this.postsService
      .updatePost(postId, post)
      .pipe(
        catchError((error) => {
          console.error('Ocorreu um erro ao atualizar a postagem:', error);
          return throwError(() => error);
        })
      )
      .subscribe((data: any) => {
        const updatedPosts = this.posts.map((p) =>
          p.id === postId ? data : p
        );
        this.posts = updatedPosts;
      });
  }

  deletePost(postId: number) {
    this.postsService
      .deletePost(postId)
      .pipe(
        catchError((error) => {
          console.error('Ocorreu um erro ao excluir a postagem:', error);
          return throwError(() => error);
        })
      )
      .subscribe(() => {
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}