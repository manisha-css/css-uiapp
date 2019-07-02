import { BasicUser } from './basicuser.model';

export class User extends BasicUser {
  userPassword: string;
  userVerificationCode: string; // this is what user enters
  confirmPassword: string;
  acceptTC: boolean;

  // required for change password
  oldPassword: string;
  newPassword: string;
  subscribeCssUpdates: boolean;

  accountDisabled: boolean;
  deleteStatus: boolean;

  constructor() {
    super();
  }
}
