import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';
import {
  BehaviorSubject,
  concatMap,
  lastValueFrom,
  map,
  Observable,
} from 'rxjs';
import jwt_decode from 'jwt-decode';
import { environment } from '../../../../environments/environment';
import {
  SingInUser,
  UserLogin,
  UserLoginResponse,
  Response,
  ChangePasswordDto,
  Authentication,
  PublicKeyCredentialRequestOptionsJSONWithUser,
} from '@core/interfaces';
import {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/typescript-types';
import {
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';
import { USER_OPTIONS } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: BehaviorSubject<UserLoginResponse> = new BehaviorSubject(null);
  constructor(
    private readonly sweetAlert2Loader: SweetAlert2LoaderService,
    private http: HttpClient,
    private router: Router
  ) {
    this.tokenExpired();
    this.isLogged();
  }

  get user$() {
    return this._user.asObservable();
  }

  private tokenExpired() {
    const token = localStorage.getItem('token') || null;
    if (!token) {
      this.logOut();
      return null;
    }
    const decode = jwt_decode(token);
    const isExpired = Math.floor(new Date().getTime() / 1000) >= decode['exp'];
    if (isExpired) {
      this.logOut();
    }
  }

  login(userLogin: UserLogin): Observable<UserLoginResponse> {
    return this.http.post(`${environment.API_URL}/auth/login`, userLogin).pipe(
      map((user: UserLoginResponse) => {
        this.saveUserInLocalStorage(user);
        this._user.next(user);
        return user;
      })
    );
  }

  isLogged() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    const firstName = localStorage.getItem('firstName');
    const image = localStorage.getItem('image');
    if (localStorage.getItem('token')) {
      this._user.next({
        token,
        email,
        role,
        firstName,
        image,
      });
    }
  }

  forgotPassword(email: string): Observable<Response> {
    return this.http.post<Response>(
      `${environment.API_URL}/auth/forgot-password/${email}`,
      null
    );
  }

  changePassword(changePasswordDto: ChangePasswordDto): Observable<Response> {
    return this.http.post<Response>(
      `${environment.API_URL}/auth/change-password`,
      changePasswordDto
    );
  }

  private saveUserInLocalStorage(user: UserLoginResponse) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('email', user.email);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('image', user.image);
    localStorage.setItem('role', user.role);
  }

  singIn(singInUser: SingInUser): Observable<Response> {
    return this.http.post<Response>(
      `${environment.API_URL}/auth/sign-in`,
      singInUser
    );
  }

  async swalLogOut() {
    const swal = await this.sweetAlert2Loader.swal;
    const { isConfirmed } = await swal.fire({
      title: 'Va cerrar sesión',
      text: '¿Esta seguro?',
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    });
    if (isConfirmed) {
      this.logOut();
    }
  }

  logOut() {
    localStorage.removeItem('token');
    this._user.next(null);
    this.router.navigateByUrl('/');
  }

  getRegistrationAuthnWeb() {
    return this.http
      .get<PublicKeyCredentialCreationOptionsJSON>(
        `${environment.API_URL}/auth/generate-registration-options`
      )
      .pipe(
        concatMap(async (res) => {
          return await this.generateVerifyRegistration(res);
        })
      );
  }

  async generateVerifyRegistration(
    res: PublicKeyCredentialCreationOptionsJSON
  ) {
    try {
      const attResp = await startRegistration(res);
      const verifyRegistration = await this.verifyRegistration(attResp);
      localStorage.setItem(USER_OPTIONS.FINGERPRINT, 'true');
      return verifyRegistration;
    } catch (error) {
      this.isPreviousRegisterWebAuthn(error);
      throw new Error(error);
    }
  }

  verifyRegistration(registrationCredentialJSON: RegistrationResponseJSON) {
    return lastValueFrom(
      this.http.post<Authentication>(
        `${environment.API_URL}/auth/verify-registration`,
        registrationCredentialJSON
      )
    );
  }

  async isPreviousRegisterWebAuthn(error: any) {
    const swal = await this.sweetAlert2Loader.swal;
    if (
      error.toString().includes('The authenticator was previously registered')
    ) {
      swal.fire('', 'Su dispositivo ya se encuentra registrado', 'info');
      localStorage.setItem(USER_OPTIONS.FINGERPRINT, 'true');
    } else {
      swal.fire('Error', 'Algo salio mal al registrarse', 'error');
    }
  }

  startAuthentication(): Observable<UserLoginResponse> {
    const email = localStorage.getItem('email');
    return this.http
      .get<PublicKeyCredentialRequestOptionsJSON>(
        `${environment.API_URL}/auth/generate-authentication-options/${email}`
      )
      .pipe(
        concatMap(async (res) => {
          return await this.generateVerificationAuthentication(res);
        })
      );
  }

  async generateVerificationAuthentication(
    res: PublicKeyCredentialRequestOptionsJSON
  ) {
    const email = localStorage.getItem('email');
    const asseRep = await startAuthentication(res);
    Object.assign(asseRep, { username: email });
    return await this.verifityAuthentication(asseRep);
  }

  verifityAuthentication(data: AuthenticationResponseJSON) {
    return lastValueFrom(
      this.http
        .post<PublicKeyCredentialRequestOptionsJSONWithUser>(
          `${environment.API_URL}/auth/verify-authentication`,
          data
        )
        .pipe(
          map(({ data }) => {
            this.saveUserInLocalStorage(data);
            this._user.next(data);
            return data;
          })
        )
    );
  }
}
