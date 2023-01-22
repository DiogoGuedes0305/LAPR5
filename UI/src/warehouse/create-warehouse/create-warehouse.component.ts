import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';
import { Warehouse } from 'warehouse/warehouse';
import { WarehouseService } from '../warehouse.service';


@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.css']
})
export class CreateWarehouseComponent implements OnInit {
  constructor(private warehouseService : WarehouseService) { }

  ngOnInit(): void {
  }

  onClickSubmit(data: {
    warehouseDescription: any;
    warehouseAddress: any;
    warehouseLat: any;
    warehouseLong: any;
    warehouseHeigth: any;
  }): void {
    this.warehouseService
      .addWarehouse({
        id:undefined,
        description: data.warehouseDescription,
        address: data.warehouseAddress,
        latitud: data.warehouseLat,
        longitud: data.warehouseLong,
        height: data.warehouseHeigth,
        isActive: true
      })
      .subscribe((warehouse: Warehouse) => {
        alert(
          'warehouse with description ' +
          warehouse.description
            +
            'created'
        );
      });
  }

}
