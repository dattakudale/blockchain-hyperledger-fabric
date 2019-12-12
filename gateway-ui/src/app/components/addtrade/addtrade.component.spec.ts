import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtradeComponent } from './addtrade.component';

describe('AddtradeComponent', () => {
  let component: AddtradeComponent;
  let fixture: ComponentFixture<AddtradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
