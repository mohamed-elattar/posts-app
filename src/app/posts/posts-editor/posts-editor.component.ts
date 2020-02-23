import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../../core/models/post.model';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-editor',
  templateUrl: './posts-editor.component.html',
  styleUrls: ['./posts-editor.component.css']
})
export class PostEditorComponent implements OnInit, OnDestroy {
  post: Post = {} as Post;
  postForm: FormGroup;
  errors: object = {};
  imagePreview: string;
  isSubmitting = false;
  private routeSub: Subscription;
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required]],
      image: ['', [Validators.required], [mimeType.bind(this)]]
    });
  }

  ngOnInit() {
    this.routeSub = this.route.data.subscribe((data: { post: Post }) => {
      if (data.post) {
        this.post = data.post;
        this.imagePreview = data.post.imagePath;
        this.postForm.patchValue(data.post);
      }
    });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({ image: file });
    this.postForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  submitForm() {
    this.isSubmitting = true;
    this.updatePost(this.postForm.value);
    this.postsService.save(this.post).subscribe(
      message => {
        this.isSubmitting = false;
        this.router.navigateByUrl('/posts');
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updatePost(values: object) {
    Object.assign(this.post, values);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
