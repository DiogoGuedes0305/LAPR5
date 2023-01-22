import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Delivery } from './delivery';
import { DeliveryService } from './delivery.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent {
  deliveries: Delivery[] = [];
  dataSource!: MatTableDataSource<Delivery>;
  sortedData;
  displayedColumn: string[] = ['date','weight','loadTime','unloadTime', 'wareId'];

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private deliveryService: DeliveryService) {
    this.dataSource = new MatTableDataSource(this.deliveries);
    this.sortedData = this.deliveries.slice();
  }

  ngOnInit(): void {
    this.getDeliveries();
  }

  getDeliveries(): void {
    this.deliveryService
      .getDeliveries()
      .subscribe((deliveries) => (this.deliveries = deliveries));
      
  }


  applyFilter( event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const data = this.deliveries.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'warehouse':
          return compare(a.wareId, b.wareId, isAsc);
        case 'date':
          return compare(a.date, b.date, isAsc);
        default:
          return 0;
      }
    });

    this.deliveries = this.sortedData;
    this.dataSource = new MatTableDataSource(this.deliveries);
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
