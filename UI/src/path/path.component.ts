import { Component, OnInit, ViewChild } from '@angular/core';
import { Path } from './path';
import { PathService } from './path.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css'],
})
export class PathComponent implements OnInit {

  paths: Path[] = [];

  displayedColumn: string[] = ['warehouseDeparture', 'warehouseArrival', 'distance', 'time',
    'extraTime', 'energyExpended'];

    dataSource!: MatTableDataSource<Path>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  pageSize = 2;
  pageIndex = 0;
  totalItems = 0;
  max = false;
  posts: any;

  constructor(private pathService: PathService) {}

  ngOnInit(): void {
    this.getPaths();
  }

  pageChangeSize($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.getPaths();
  }

  next(): void {
    this.pageIndex++;
    this.getPaths();
  }

  back(): void {
    if (this.pageIndex <= 1) {
      this.pageIndex = 1;
    }
    this.pageIndex--;
    this.getPaths();
  }

  getPaths(): void {
    this.pathService.getPaths(this.pageIndex + 1, this.pageSize).subscribe((paths) => {
      if (paths.length > 0) {
        this.max = false;
        this.posts = paths;
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalItems = paths.length;
      }else{
        this.max = true;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
