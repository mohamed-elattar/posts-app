import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import { Observable } from 'rxjs';
import { PostsService } from '../../core/services/posts.service';
import { Post } from '../../core/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class EditablePostResolverService implements Resolve<Post> {
  constructor(
    private postsService: PostsService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.postsService.get(route.params.postId).pipe(
      map(post => {
        if (this.userService.getCurrentUser().userId === post.creator) {
          return post;
        } else {
          this.router.navigateByUrl('/');
        }
      }),
      catchError(err => this.router.navigateByUrl('/'))
    );
  }
}
