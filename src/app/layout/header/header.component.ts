import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicUserService } from 'src/app/user/basicuser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  selectedLang: any;
  languageList = [{ code: 'en', label: 'English' }, { code: 'fr', label: 'French' }];

  constructor(private router: Router, public basicUserService: BasicUserService, platformLocation: PlatformLocation) {
    console.log((platformLocation as any).location);
    console.log((platformLocation as any).location.href);
    console.log((platformLocation as any).location.pathname);
    // get first part which is locale
    const pathArr = (platformLocation as any).location.pathname.split('/');
    if (pathArr.length > 0) {
      this.selectedLang = pathArr[0];
    } else {
      this.selectedLang = 'en';
    }
  }

  ngOnInit() {}

  onChangeLang(lang: any) {
    console.log('lang code ' + lang + JSON.stringify(this.selectedLang));
    this.router.navigateByUrl(this.selectedLang);
  }
}
