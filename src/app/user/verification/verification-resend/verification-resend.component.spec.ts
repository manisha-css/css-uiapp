import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationResendComponent } from './verification-resend.component';

describe('VerificationResendComponent', () => {
  let component: VerificationResendComponent;
  let fixture: ComponentFixture<VerificationResendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationResendComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationResendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
