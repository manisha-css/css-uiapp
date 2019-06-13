import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  constructor() {}

  // error messages
  public BACKEND_SERVER_DOWN = 'Backend server seems to be down, please try again later';
}
