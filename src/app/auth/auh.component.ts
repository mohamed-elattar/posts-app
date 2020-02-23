import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { Subscription } from 'rxjs';
import { Errors } from '../core/models/errors.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  authType = '';
  title = '';
  isSubmitting = false;
  routeSubscription: Subscription;
  errors: Errors = { errors: {} };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.routeSubscription = this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = this.authType === 'login' ? 'Sign In' : 'Sign Up';
      if (this.authType === 'register') {
      }
    });
  }
  submitForm(form: NgForm) {
    this.isSubmitting = true;
    this.errors = { errors: {} };
    const credentials: { email: string; password: string } = form.value;
    const cred: { [key: string]: string } = {};
    cred.email = form.value.email;
    cred.password = form.value.password;

    this.userService.attemptAuth(this.authType, credentials).subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
