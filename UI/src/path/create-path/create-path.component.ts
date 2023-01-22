import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'warehouse/warehouse.service';
import { Warehouse } from 'warehouse/warehouse';
import { PathService } from 'path/path.service';
import { Path } from 'path/path';

@Component({
  selector: 'app-create-path',
  templateUrl: './create-path.component.html',
  styleUrls: ['./create-path.component.css'],
})
export class CreatePathComponent implements OnInit {
  warehouses: Warehouse[] = [];

  constructor(
    private warehouseService: WarehouseService,
    private pathService: PathService
  ) {}

  ngOnInit(): void {
    this.getWarehouses();
  }

  getWarehouses(): void {
    this.warehouseService
      .getWarehouses()
      .subscribe((warehouses) => (this.warehouses = warehouses));
  }

  onClickSubmit(data: {
    distance: any;
    time: any;
    extraTime: any;
    energyExpended: any;
    DepartureWarehouse: any;
    ArrivalWarehouse: any;
  }): void {
    this.pathService
      .addPath({
        distance: data.distance,
        energyExpended: data.energyExpended,
        warehouseArrival: data.ArrivalWarehouse,
        warehouseDeparture: data.DepartureWarehouse,
        time: data.time,
        extraTime: data.extraTime,
      })
      .subscribe((path: Path) => {
        alert(
          'Path between Warehouse ' +
            path.warehouseDeparture +
            ' and Warehouse ' +
            path.warehouseArrival +
            ' was created'
        );
      });
  }
}
