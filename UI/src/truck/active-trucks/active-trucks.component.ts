import { Component, OnInit, ViewChild } from '@angular/core';
import { Truck } from 'truck/truck';
import { TruckService } from 'truck/truck.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-active-trucks',
  templateUrl: './active-trucks.component.html',
  styleUrls: ['./active-trucks.component.css']
})

export class ActiveTrucksComponent implements OnInit {

  trucks: Truck[] = [];

  displayedColumn: string[] = ['truckPlate', 'truckAutonomyWithCargo', 'truckBatteryEnergy', 'truckCargoCapacity',
    'truckFastRechargeTime', 'truckTare'];

    dataSource!: MatTableDataSource<Truck>;
    @ViewChild(MatPaginator) paginator!: MatPaginator
    @ViewChild(MatSort) sort!: MatSort

  pageSize = 2;
  pageIndex = 0;
  totalItems = 0;
  max = false;
  posts:any;


  constructor(private truckService : TruckService) {
   }

  ngOnInit(): void {
    this.getActiveTrucks();
  }

  pageChangeSize($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.getActiveTrucks();
  }

  next(): void {
    this.pageIndex++;
    this.getActiveTrucks();
  }

  back(): void {
    if (this.pageIndex <= 1) {
      this.pageIndex = 1;
    }
    this.pageIndex--;
    this.getActiveTrucks();
  }

  getActiveTrucks(): void {
    this.truckService.getActiveTrucks(this.pageIndex + 1, this.pageSize).subscribe((trucks) => {
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
 
  applyFilter( event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}
