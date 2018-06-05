import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSubmissionComponent } from './general-submission.component';

describe('GeneralSubmissionComponent', () => {
  let component: GeneralSubmissionComponent;
  let fixture: ComponentFixture<GeneralSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
