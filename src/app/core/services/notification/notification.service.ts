import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ToastrService } from 'ngx-toastr';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { Response } from '@core/interfaces';
import { environment } from '../../../../environments/environment';
import { USER_OPTIONS } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private toastService: ToastrService,
    private swPush: SwPush,
    private http: HttpClient
  ) {}

  async getTokenNotification(): Promise<PushSubscription> {
    try {
      return await this.swPush.requestSubscription({
        serverPublicKey: environment.VAPID_PUBLIC_KEY,
      });
    } catch (error) {
      console.error(error);
      this.toastService.error('Error al suscribir notificaciones');
      localStorage.setItem(USER_OPTIONS.NOTIFICATIONS, 'false');
      throw new Error('Error al suscribir notificaciones');
    }
  }

  async saveUserNotification(): Promise<Response> {
    const token = await this.getTokenNotification();
    return lastValueFrom(
      this.http
        .post<Response>(`${environment.API_URL}/notification`, {
          tokenPush: JSON.stringify(token),
        })
        .pipe(
          map((res) => {
            localStorage.setItem(USER_OPTIONS.NOTIFICATIONS, 'true');
            return res;
          }),
          catchError((err) => {
            localStorage.setItem(USER_OPTIONS.NOTIFICATIONS, 'false');
            return of(err);
          })
        )
    );
  }
}
