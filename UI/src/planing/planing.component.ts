import { Component, OnInit } from '@angular/core';
import { PlaningService } from './planing.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-planing',
  templateUrl: './planing.component.html',
  styleUrls: ['./planing.component.css'],
})
export class PlaningComponent implements OnInit {
  custo = null;
  warehouses = null;

  constructor(private planingService: PlaningService) {}
  ngOnInit(): void {}
  onClickSubmit(data: { truckPlate: any; date: any; shearchType: any }) {
    switch (data.shearchType) {
      case 'bestSolution': {
        this.get_best_solution(data.truckPlate, data.date);
        break;
      }
      case 'allPath': {
        this.get_all_paths(data.truckPlate, data.date);
        break;
      }
      case 'heuristic1': {
        this.heuristic1(data.date);
        break;
      }
      case 'heuristic2': {
        this.heuristic2(data.date);
        break;
      }
      case 'heuristic3': {
        this.heuristic3(data.date);
        break;
      }
      default: {
        this.get_all_paths(data.truckPlate, data.date);
        break;
      }
    }
  }
  heuristic3(date: string) {
    let path = this.planingService.heuristic3(date);
    path.then(async (response) => {
      this.custo = null;
      this.warehouses = response[0];
    });
    return path;
  }
  heuristic2(date: string) {
    let path = this.planingService.heuristic2(date);
    path.then(async (response) => {
      this.custo = null;
      this.warehouses = response[0];
    });
    return path;
  }
  heuristic1(date: string) {
    let path = this.planingService.heuristic1(date);
    path.then(async (response) => {
      this.custo = null;
      this.warehouses = response[0];
    });
    return path;
  }

  get_all_paths(truckPlate: string, date: string): any {
    let all_paths = this.planingService.all_paths(truckPlate, date);
    return all_paths;
  }

  get_best_solution(truckPlate: string, date: string): any {
    let best_solution = this.planingService.best_solution(truckPlate, date);
    best_solution.then(async (response) => {
      this.custo = response[1];
      this.warehouses = response[0];
    });
    return best_solution;
  }
}
