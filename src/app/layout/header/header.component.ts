import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicUserService } from 'src/app/user/basicuser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  selectedLang: string;
  languageList = [{ code: 'en', label: 'English' }, { code: 'fr', label: 'French' }];

  constructor(private router: Router, public basicUserService: BasicUserService, private platformLocation: PlatformLocation) {}

  ngOnInit() {
    // get first 2 characters afetr / which is locale
    this.selectedLang = (this.platformLocation as any).location.pathname.substring(1, 3);
  }

  onChangeLang() {
    this.router.navigateByUrl(this.selectedLang);
  }
}
