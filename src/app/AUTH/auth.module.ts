import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { Dashboard1Component } from './pages/dashboard1/dashboard1.component';


@NgModule({
  declarations: [
    Dashboard1Component
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
