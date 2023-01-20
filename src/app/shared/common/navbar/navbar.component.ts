import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ThemeService, AuthService } from '@core/services';
import { USER_OPTIONS } from '@core/constants';
import { UserLoginResponse } from '@core/interfaces';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: UserLoginResponse;
  baseUrlProfile: string = environment.API_URL + '/';

  menu = [
    {
      label: 'Libros',
      link: 'search-book',
    },
    {
      label: 'Ofertas',
      link: 'discount-book',
    },
    {
      label: 'Nosotros',
      link: 'about',
    },
    {
      label: 'FAQ',
      link: 'faq',
    },
  ];

  isLoggedIn: boolean = false;
  userOptionsForm: FormGroup;
  menuOpen = new BehaviorSubject(false);

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createFormNav();
    this.getUserLogged();
  }

  getUserLogged() {
    this.authService.user$.subscribe((_user) => {
      if (_user) {
        this.isLoggedIn = true;
        this.user = _user;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  createFormNav() {
    this.userOptionsForm = this.fb.group({
      userTheme: [this.themeService.existInStorage(USER_OPTIONS.DARK_THEME)],
    });
  }

  onChangeTheme(event) {
    this.themeService.setTheme(event.target.checked);
  }

  logOut() {
    this.authService.swalLogOut();
  }
}
