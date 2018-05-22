import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRouteComponent } from './activity-route.component';

describe('ActivityRouteComponent', () => {
  let component: ActivityRouteComponent;
  let fixture: ComponentFixture<ActivityRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
