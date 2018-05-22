import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityRouteComponent } from './create-activity-route.component';

describe('CreateActivityRouteComponent', () => {
  let component: CreateActivityRouteComponent;
  let fixture: ComponentFixture<CreateActivityRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActivityRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActivityRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
