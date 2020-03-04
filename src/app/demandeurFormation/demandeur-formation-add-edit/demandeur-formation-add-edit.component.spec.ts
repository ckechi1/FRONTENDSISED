import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeurFormationAddEditComponent } from './demandeur-formation-add-edit.component';

describe('DemandeurFormationAddEditComponent', () => {
  let component: DemandeurFormationAddEditComponent;
  let fixture: ComponentFixture<DemandeurFormationAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeurFormationAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeurFormationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
