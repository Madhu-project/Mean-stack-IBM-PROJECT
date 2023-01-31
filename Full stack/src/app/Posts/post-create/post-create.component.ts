import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  //@Output() postCreated = new EventEmitter(); // @output decorator turn into an event so it can be listened from outside.. this sybol is generic type(means it can have any datatype)

  //@Output() postCreated = new EventEmitter<Post>(); //now this is datatype specific.. we are telling to use datatype present in Post interface

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    // console.log(
    //   'upon clicking enter : title: ' +
    //     this.enteredTitle +
    //     'content: ' +
    //     this.enteredContent
    // );
    console.log('hi');

    console.log(
      'upon clicking enter : title: ' +
        form.value.title +
        'content: ' +
        form.value.content
    );

    if (form.invalid) {
      return;
    }
    const post: Post = {
      // title: this.enteredTitle,
      // content: this.enteredContent,
      id: '',
      title: form.value.title,
      content: form.value.content,
    };

    //this.postCreated.emit(post); //this event emitter will pass values to post list component for displaying as an argument

    this.postsService.addPost(form.value.title, form.value.content);

    form.resetForm();
  }
}
