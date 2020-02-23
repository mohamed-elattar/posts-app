import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../../core/models/post.model';
import { PostsService } from '../../core/services/posts.service';
import { PageEvent } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  userId: string;
  canModify: boolean;
  loading = false;
  posts: Post[] = [];
  totalPosts = 0;
  postsPerPage = 10;
  currentPage = 1;
  params: object = {};
  pageSizeOptions = [1, 2, 5, 10];
  private authSub: Subscription;
  private userSub: Subscription;

  constructor(
    private postsService: PostsService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.authSub = this.userService.isAuthenticated.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
    this.userSub = this.userService.currentUser.subscribe((userData: User) => {
      this.userId = userData.userId;
    });

    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    const params: { [key: string]: any } = {};
    params.postsPerPage = this.postsPerPage;
    params.currentPage = this.currentPage;
    this.postsService.query(params).subscribe(data => {
      this.loading = false;
      this.posts = data.posts;
      this.totalPosts = data.postsCount;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.loading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.runQuery();
  }

  onDelete(postId: string) {
    this.loading = true;
    this.postsService.destroy(postId).subscribe(
      () => {
        this.runQuery();
      },
      () => {
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
