import { Component } from '@angular/core';
import { Warehouse } from './warehouse';
import { WarehouseService } from './warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
})
export class WarehouseComponent {
  warehouses: Warehouse[] = [];

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.getWarehouses();
  }

  getWarehouses(): void {
    this.warehouseService
      .getWarehouses()
      .subscribe((warehouses) => (this.warehouses = warehouses));
  }
  delete(warehouse: Warehouse): void {
    console.log(warehouse.id);
    if(warehouse.id)
    this.warehouseService.deleteWarehouse(warehouse.id).subscribe();
    this.getWarehouses();
  }
  deactivate(warehouse: Warehouse): void{
    console.log(warehouse.id);
    if(warehouse.id)
    this.warehouseService.deactivateWarehouse(warehouse.id).subscribe();
    this.getWarehouses();
  }
}
