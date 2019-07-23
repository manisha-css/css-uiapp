import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Injectable()
export class ConstantService {
  constructor(private platformLocation: PlatformLocation) {}

  // error messages
  public BACKEND_SERVER_DOWN = 'Backend server seems to be down, please try again later';
  public BACKEND_NOT_FOUND = 'Backend server api not found';

  public AUTHGUARD_LOGIN = 'This Menu option requires you to login. Please login.';

  public AUTHORIZATION_HEADER_STRING = 'Authorization';
  public LOCAL_STORAGE_LOGGEDINUSER_ID = 'LoggedInUserId';
  public LOCAL_STORAGE_JWTTOKEN = 'JWTToken';

  // validation pattern
  public SECRETKEY_PATTERN = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9\\s]).{8,16}$';
  public EMAIL_PATTERN =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  public PHONE_PATTERN = '^[(]([1-9][0-9]{2})[)][-]([0-9]{3})[-]([0-9]{4})$'; // the form of 847-403-3160
  public DISPLAYNAME_PATTERN = '^[A-Za-z]{1,}[A-Za-z0-9-_]{2,17}$';

  public CATEGORYNAME_PATTERN = '^[A-Za-z]{1,}[A-Za-z0-9-_]{2,17}$';
  public SUBJECTCODE_PATTERN = '^[A-Za-z]{1,}[A-Za-z0-9-_]{2,17}$';
  public TAGNAME_PATTERN = '^[A-Za-z]{1,}[A-Za-z0-9-_]{2,17}$';

  public ALPHA_PATTERN = '^[A-Za-z]{0,}$';
  public ALPHA_PATTERN_WITHSPACE = '^[A-Za-z]{1,}[A-Za-z\\s]{0,}$';
  public NUMERIC_PATTERN = '^[0-9]{0,}$';
  public ALPHANUMERIC_PATTERN_WITHCOMMA = '^[A-Za-z]{1,}[A-Za-z0-9,]{0,}$';
  public ALPHANUMERIC_PATTERN_WITHSPACE = '^[A-Za-z]{1,}[A-Za-z0-9\\s]{0,}$';
  public ALPHANUMERIC_PATTERN_NOSPACE = '^[A-Za-z]{1,}[A-Za-z0-9]{0,}$';
  public ALPHANUMERIC_SOMESPECIALCHARS_PATTERN = '^[\\s\\S]{0,}$';

  public HTML_FILE_PATTERN = '^[A-Za-z]{1,}[A-Za-z0-9]{0,}[.]{1}(html|htm)$';
  public URL_PATTERN = '^(http[s]?:\\/\\/(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?';
  // end of validation patterns

  // start of validation messages
  public MESSAGE_REQUIRED = 'is required';
  public MESSAGE_SECRETKEY_PATTERN = 'should contain at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character.';
  public MESSAGE_EMAIL_PATTERN = 'should contain proper email format';
  public MESSAGE_DISPLAYNAME_PATTERN =
    'should start with alphabet, should have min length of 8 characters, should contain only alphanumeric value and - and _';
  public MESSAGE_CATEGORYNAME_PATTERN =
    'should start with alphabet, should have min length of 4 characters, should contain only alphanumeric value and - and _';
  public MESSAGE_ALPHA_PATTERN = 'should contain only alphabets';
  public MESSAGE_ALPHA_PATTERN_WITHSPACE = 'should contain only alphabets and space';
  public MESSAGE_NUMERIC_PATTERN = 'should contain only numbers';
  public MESSAGE_SHORT_NUMERIC_PATTERN = 'Numbers only';
  public MESSAGE_ALPHANUMERIC_PATTERN_WITHSPACE = 'should contain alphanumeric and space with first letter from alphabet';
  public MESSAGE_ALPHANUMERIC_PATTERN_NOSPACE = 'should contain alphanumeric with first letter from alphabet';
  public MESSAGE_SHORT_ALPHANUMERIC_PATTERN_WITHSPACE = 'Alphanumeric and space.';
  public MESSAGE_ALPHANUMERIC_PATTERN_WITHCOMMA = 'should start with alphabet, should contain alphanumeric and comma';
  public MESSAGE_SHORT_ALPHANUMERIC_PATTERN_WITHCOMMA = 'Alphanumeric and comma,';
  public MESSAGE_ALPHANUMERIC_SOMESPECIALCHARS_PATTERN = 'can contain alphanumeric, space and few special characters.';
  public MESSAGE_SHORT_ALPHANUMERIC_SOMESPECIALCHARS_PATTERN = 'only alphanumeric, space and special characters.';
  public MESSAGE_ALPHANUMERIC_FILE_PATTERN = 'Please enter valid file name';
  public MESSAGE_URL_PATTERN = 'Please enter valid URL';
  // // end of validation messsages

  // // html form related
  public TEXTAREA_ROWS = 5;
  public TEXTAREA_COLUMNS = 10;

  public TEXTAREA_MAXLENGTH_REGULAR = 1000;

  public TEXTAREA_GENERAL_ANSWER = 200;
  public TEXTAREA_MAXLENGTH_SUMMARY = 100;
  public TINYMCE_TEXTAREA_MAXLENGTH = 20000;

  public INPUTTEXT_MAXLENGTH_TITLE = 200;
  public INPUTTEXT_MAXLENGTH_EMAIL = 200;
  public INPUTTEXT_MAXLENGTH_SMALL = 50;
  public INPUTTEXT_MAXLENGTH_VERIFICATIONCODE = 5;
  public INPUTTEXT_MAXLENGTH_FORTINYINT = 3;
  public INPUTTEXT_MAXLENGTH_FORTIMER = 3;
  public INPUTTEXT_MAXLENGTH_FORMATCHPAIR = 2;
  public INPUTTEXT_MAXLENGTH_REGULAR = 100;
  public INPUTTEXT_MAXLENGTH_MEDIUM = 200;
  public INPUTTEXT_MAXLENGTH_LARGE = 500;

  public PASSWORD_MINLENGTH = 8;
  public PASSWORD_MAXLENGTH = 16;

  public DISPLAYNAME_MINLENGTH = 3;
  public DISPLAYNAME_MAXLENGTH = 20;

  public CATEGORYNAME_MINLENGTH = 3;
  public CATEGORYNAME_MAXLENGTH = 20;

  public TABLE_COLUM_MAXLENGTH = 25;

  addHttptHeader(jsonType: boolean): HttpHeaders {
    let headers = new HttpHeaders();
    const selectedLang = (this.platformLocation as any).location.pathname.substring(1, 3);
    headers = headers.append('Accept-Language', selectedLang);
    if (jsonType) {
      headers = headers.append('Content-Type', 'application/json');
    } else {
      headers = headers.append('Content-Type', 'text/plain');
    }
    return headers;
  }

  public isEmpty(obj): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}
