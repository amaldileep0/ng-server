import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDilogComponent } from './confirm-dilog.component';

describe('ConfirmDilogComponent', () => {
  let component: ConfirmDilogComponent;
  let fixture: ComponentFixture<ConfirmDilogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDilogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
