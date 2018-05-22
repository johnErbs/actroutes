import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetrouteComponent } from './getroute.component';

describe('GetrouteComponent', () => {
  let component: GetrouteComponent;
  let fixture: ComponentFixture<GetrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
