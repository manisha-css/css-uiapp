import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicUserService } from 'src/app/user/basicuser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  selectedLang: any;
  languageList = [
    // <--- add this
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' }
  ];

  constructor(private router: Router, public basicUserService: BasicUserService) {}

  ngOnInit() {}

  onChangeLang(event: any) {
    this.selectedLang = event;
    console.log('lang code ' + JSON.stringify(this.selectedLang));
    this.router.navigate(['/' + this.selectedLang + '/home']);
  }
}
