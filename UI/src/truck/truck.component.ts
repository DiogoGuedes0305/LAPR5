import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Truck } from './truck';
import { TruckService } from './truck.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {


  trucks: Truck[] = [];

  displayedColumn: string[] = ['truckPlate', 'truckAutonomyWithCargo', 'truckBatteryEnergy', 'truckCargoCapacity',
    'truckFastRechargeTime', 'truckTare', 'options'];

  dataSource!: MatTableDataSource<Truck>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  pageSize = 2;
  pageIndex = 0;
  totalItems = 0;
  max = false;
  posts: any;

  constructor(private truckService: TruckService, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getTrucks();
  }

  pageChangeSize($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.getTrucks();
  }

  next(): void {
    this.pageIndex++;
    this.getTrucks();
  }

  back(): void {
    if (this.pageIndex <= 1) {
      this.pageIndex = 1;
    }
    this.pageIndex--;
    this.getTrucks();
  }

  getTrucks(): void {
    this.truckService.getTrucks(this.pageIndex + 1, this.pageSize).subscribe((trucks) => {
      if (trucks.length > 0) {
        this.max = false;
        this.posts = trucks;
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalItems = trucks.length;
      }else{
        this.max = true;
      }
    });
  }


  delete(truck: Truck): void {
    this.truckService.deleteTruck(truck.truckPlate).subscribe();
  }

  deactivateActivateTruck(truck: Truck): void {
    this.truckService.deactivateActivate(truck.truckPlate).subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
