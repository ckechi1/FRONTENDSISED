import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeurFormationAddComponent } from './demandeur-formation-add.component';

describe('DemandeurFormationAddComponent', () => {
  let component: DemandeurFormationAddComponent;
  let fixture: ComponentFixture<DemandeurFormationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeurFormationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeurFormationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
