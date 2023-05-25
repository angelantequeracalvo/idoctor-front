import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppoinmentComponent } from './list-appoinment.component';

describe('ListAppoinmentComponent', () => {
  let component: ListAppoinmentComponent;
  let fixture: ComponentFixture<ListAppoinmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppoinmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
