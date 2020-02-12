import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DemandeurAddComponent } from './demandeur-add.component';

describe('DemandeurAddComponent', () => {
  let component: DemandeurAddComponent;
  let fixture: ComponentFixture<DemandeurAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeurAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeurAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
