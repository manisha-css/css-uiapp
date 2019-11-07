import { HeaderService } from './../../layout/header/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html'
})
export class AboutusComponent implements OnInit {
  constructor(public headerService: HeaderService) {}

  ngOnInit() {}
}
