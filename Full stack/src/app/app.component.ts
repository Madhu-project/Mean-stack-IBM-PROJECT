import { Component } from '@angular/core';
import { Post } from './Posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mean-stack';
  //storedPosts = []; before adding interface
  // storedPosts: Post[] = [];

  // onPostAdded(post) {
  //   this.storedPosts.push(post);
  // }
}
