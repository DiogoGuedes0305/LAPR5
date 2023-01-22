import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWarehouseComponent } from './create-warehouse.component';

describe('CreateWarehouseComponent', () => {
  let component: CreateWarehouseComponent;
  let fixture: ComponentFixture<CreateWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  });
});
