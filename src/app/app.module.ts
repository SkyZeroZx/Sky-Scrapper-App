import { NgModule, isDevMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  SweetAlert2LoaderService,
  SweetAlert2Module,
} from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ErrorInterceptorService,
  TokenInterceptorService,
} from '@core/interceptor';
import { ContentLayoutComponent } from './layout';
import { toastrConfig } from '@core/config/toastr.config';
import { SharedModule } from '@shared/common';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    // HammerModule,
    SharedModule,
    ServiceWorkerModule.register('custom-service-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 5 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:5000',
    }),
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot(toastrConfig),
    NgxSkeletonLoaderModule.forRoot(),
  ],
  declarations: [AppComponent, AuthLayoutComponent, ContentLayoutComponent],
  providers: [
    { provide: ToastrService, useClass: ToastrService },
    { provide: SweetAlert2LoaderService, useClass: SweetAlert2LoaderService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
