import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittradeComponent } from './edittrade.component';

describe('EdittradeComponent', () => {
  let component: EdittradeComponent;
  let fixture: ComponentFixture<EdittradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
