import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  panelOpenState = false;

  // posts = [
  //   { title: 'First Post', content: 'This is First post content' },
  //   { title: 'Second Post', content: 'This is Second post content' },
  //   { title: 'Third Post', content: 'This is Third post content' },
  //   { title: 'Fourth Post', content: 'This is Fourth post content' },
  // ];

  posts: Post[] = [];
  private postsSub: Subscription;

  //dependecny injection
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePosts(postId);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
