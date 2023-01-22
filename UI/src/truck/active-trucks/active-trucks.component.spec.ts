import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTrucksComponent } from './active-trucks.component';

describe('ActiveTrucksComponent', () => {
  let component: ActiveTrucksComponent;
  let fixture: ComponentFixture<ActiveTrucksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveTrucksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
