import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'css-uiapp';
  languageList = [
    // <--- add this
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' }
  ];
}
