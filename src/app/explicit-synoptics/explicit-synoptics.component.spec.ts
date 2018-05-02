import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplicitSynopticsComponent } from './explicit-synoptics.component';

describe('ExplicitSynopticsComponent', () => {
  let component: ExplicitSynopticsComponent;
  let fixture: ComponentFixture<ExplicitSynopticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplicitSynopticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplicitSynopticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
