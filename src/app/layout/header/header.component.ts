import { HeaderService } from './header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicUserService } from 'src/app/user/basicuser.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  SOCKET_URL = environment.SOCKET_URL;
  selectedLang: string;
  languageList = [{ code: 'en', label: 'English' }, { code: 'fr', label: 'French' }];

  constructor(
    private router: Router,
    public basicUserService: BasicUserService,
    public headerService: HeaderService // private platformLocation: PlatformLocation, // private logger: NGXLogger
  ) {}

  ngOnInit() {
    // get first 2 characters after '/' which is locale
    // this.selectedLang = (this.platformLocation as any).location.pathname.substring(1, 3);
  }

  onChangeLang() {
    this.router.navigateByUrl(this.headerService.selectedLang);
  }
  // introMethod() {
  //   this.headerService.helpintro(this.selectedLang).subscribe(
  //     (response: InfoResponse) => {
  //       const intro = IntroJs();
  //       console.log(response.result);
  //       const jsonobj = JSON.parse(response.result);
  //       intro.setOptions(jsonobj);
  //       this.logger.debug('Help info retrieved successfully');
  //       intro.start();
  //     },
  //     () => {}
  //   );
  // }
}
