import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileOptionsComponent } from './components/profile-options/profile-options.component';
import { ProfilePhotoComponent } from './components/profile-photo/profile-photo.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileOptionsComponent,
    ProfilePhotoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
