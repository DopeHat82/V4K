import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SexploreComponent } from './sexplore.component';

describe('SexploreComponent', () => {
  let component: SexploreComponent;
  let fixture: ComponentFixture<SexploreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexploreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SexploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
