import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeurEditComponent } from './demandeur-edit.component';

describe('DemandeurEditComponent', () => {
  let component: DemandeurEditComponent;
  let fixture: ComponentFixture<DemandeurEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeurEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeurEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
