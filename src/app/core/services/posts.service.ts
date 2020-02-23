import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private apiService: ApiService) {}

  query(params: {}): Observable<{ posts: Post[]; postsCount: number }> {
    return this.apiService.get(
      '/posts',
      new HttpParams({ fromObject: params })
    );
  }

  get(id): Observable<Post> {
    return this.apiService.get('/posts/' + id);
  }

  destroy(id) {
    return this.apiService.delete('/posts/' + id);
  }

  save(post): Observable<Post> {
    const postData: FormData = new FormData();
    if (typeof post.image === 'object') {
      postData.append('image', post.image, post.title);
    } else {
      postData.append('imagePath', post.imagePath);
    }
    postData.append('title', post.title);
    postData.append('content', post.content);

    if (post._id) {
      postData.append('_id', post._id);
      return this.apiService.put('/posts/' + post._id, postData);
    } else {
      return this.apiService.post('/posts', postData);
    }
  }
}
