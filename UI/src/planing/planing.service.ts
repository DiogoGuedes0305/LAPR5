import { variables } from '../variables';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlaningService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  async best_solution(truckPlate: string, data: string) {
    return await fetch(
      variables.PROLOG_URL +
        'best_solution?truckPlate=' +
        truckPlate +
        '&data=' +
        data
    ).then(async (response) => {
      return response.json().then((data) => {
        return data;
      });
    });
  }

  async all_paths(truckPlate: string, data: string) {
    return await fetch(
      variables.PROLOG_URL +
        'all_paths?truckPlate=' +
        truckPlate +
        '&data=' +
        data
    ).then(async (response) => {
      return response.json().then((data) => {
        return data;
      });
    });
  }

  async heuristic1(data: string) {
    return await fetch(variables.PROLOG_URL + 'heuristic1?data=' + data).then(
      async (response) => {
        return response.json().then((data) => {
          return data;
        });
      }
    );
  }

  async heuristic2(data: string) {
    return await fetch(variables.PROLOG_URL + 'heuristic2?data=' + data).then(
      async (response) => {
        return response.json().then((data) => {
          return data;
        });
      }
    );
  }

  async heuristic3(data: string) {
    return await fetch(variables.PROLOG_URL + 'heuristic3?data=' + data).then(
      async (response) => {
        return response.json().then((data) => {
          return data;
        });
      }
    );
  }
}

const planingService = new PlaningService();
export default planingService;
