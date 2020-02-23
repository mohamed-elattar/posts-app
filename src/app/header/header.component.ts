import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentUser: User;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(
      userData => (this.currentUser = userData)
    );
  }

  onLogout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
