import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeurFormationEditComponent } from './demandeur-formation-edit.component';

describe('DemandeurFormationAddEditComponent', () => {
  let component: DemandeurFormationEditComponent;
  let fixture: ComponentFixture<DemandeurFormationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeurFormationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeurFormationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
