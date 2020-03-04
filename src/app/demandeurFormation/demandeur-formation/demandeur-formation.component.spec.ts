import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeurFormationComponent } from './demandeur-formation.component';

describe('DemandeurFormationComponent', () => {
  let component: DemandeurFormationComponent;
  let fixture: ComponentFixture<DemandeurFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeurFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeurFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
