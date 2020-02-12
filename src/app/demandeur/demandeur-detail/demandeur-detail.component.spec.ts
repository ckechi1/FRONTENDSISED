import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeurDetailComponent } from './demandeur-detail.component';

describe('DemandeurDetailComponent', () => {
  let component: DemandeurDetailComponent;
  let fixture: ComponentFixture<DemandeurDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeurDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
