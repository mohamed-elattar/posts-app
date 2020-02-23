import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auh.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material.module';
import { HttpTokenInterceptor } from './http-token.interceptor';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AuthRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ]
})
export class AuthModule {}
