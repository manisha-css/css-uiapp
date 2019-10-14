import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicUserService } from 'src/app/user/basicuser.service';
import * as IntroJs from 'intro.js/intro.js';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  selectedLang: string;
  languageList = [{ code: 'en', label: 'English' }, { code: 'fr', label: 'French' }];

  constructor(private router: Router, public basicUserService: BasicUserService, private platformLocation: PlatformLocation) {}

  ngOnInit() {
    // get first 2 characters after '/' which is locale
    this.selectedLang = (this.platformLocation as any).location.pathname.substring(1, 3);
  }

  onChangeLang() {
    this.router.navigateByUrl(this.selectedLang);
  }
  introMethod() {
    const intro = IntroJs();
    console.log('inside intro.js');
    intro.setOptions({
      steps: [
        {
          intro: 'This is a introduction of application'
        },
        {
          element: '#selectlang',
          intro: 'Change lang here',
          position: 'left'
        },
        {
          element: '#aboutus',
          intro: '<b><u>This is about us</u></b><br/>second line',
          position: 'right'
        },
        {
          element: '#terms',
          intro: 'This is terms and services',
          position: 'right'
        },
        {
          element: '#policy',
          intro: 'This is policy',
          position: 'left'
        }
      ],
      showProgress: true,
      skipLabel: 'Skip',
      doneLabel: 'Done',
      nextLabel: 'Next',
      prevLabel: 'Prev',
      overlayOpacity: '0.5'
    });
    intro.start();
  }
}
