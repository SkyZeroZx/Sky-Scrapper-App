import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Response, UpdateUserProfile, UserProfile } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.API_URL}/user/profile`);
  }

  updateProfile(UpdateUserProfile: UpdateUserProfile): Observable<Response> {
    return this.http.patch<Response>(
      `${environment.API_URL}/user/profile`,
      UpdateUserProfile
    );
  }

  uploadPhoto(file: File): Observable<Response> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http
      .post<Response>(`${environment.API_URL}/user/photo`, formData)
      .pipe(
        map((res) => {
          localStorage.setItem('image', res.data);
          return res;
        })
      );
  }
}
