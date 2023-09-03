import { Component } from '@angular/core';
import { PostsService } from './posts.service';
import { LoadingService } from '../loading/loading.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
 posts : any[] = [];

 constructor(
  private postsService: PostsService,
  private loadingService: LoadingService,
) {}

loading$!: Observable<boolean>;


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
}
