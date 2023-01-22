import { ErrorHandler, Injectable } from '@angular/core';
import { Warehouse } from './warehouse';
import { WAREHOUSE } from './mockWarehouse';
import { MessageService } from '../messages/message.service';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { variables } from '../variables';
@Injectable({
  providedIn: 'root',
})
export class WarehouseService {

  private WarehouseURL = (variables.DOTNET_URL + "/Warehouses"); //mudar para URL da api de node.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private messageService : MessageService,
              private http : HttpClient) { }

  getWarehouses(): Observable<Warehouse[]>{
    return this.http.get<Warehouse[]>(this.WarehouseURL).pipe(
      tap(_ => this.log('Fetched Warehouse')),
      catchError(this.handleError<Warehouse[]>('getWarehouse', []))) ;
  }

  getWarehouseById(description: String): Observable<Warehouse> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const warehouse = WAREHOUSE.find(t => t.description === description)!;
    this.messageService.add(`WarehouseService: fetched Warehouse by description=${description}`);
    return of(warehouse);
  }

  addWarehouse(warehouse:Warehouse): Observable<Warehouse> {
      return this.http.post<Warehouse>(this.WarehouseURL, warehouse, this.httpOptions).pipe(
        tap((newWarehouse: Warehouse) => this.log(`Added warehouse w/ description=${newWarehouse.description}`)),
        catchError(this.handleError<Warehouse>('addWarehouse'))
      );
  }
  deactivateWarehouse(warehouseId: string) : Observable<any>{
    return this.http.delete<Warehouse>(this.WarehouseURL+"/"+warehouseId, this.httpOptions).pipe(
      tap((newWarehouse: Warehouse) => this.log(`deactivated warehouse w/ description=${newWarehouse.description}`)),
      catchError(this.handleError<Warehouse>('deactivate')))
  }
  deleteWarehouse(warehouseId: string): Observable<any> {
    
    return this.http.delete<Warehouse>(this.WarehouseURL+"/"+warehouseId+"/hard", this.httpOptions).pipe(
      tap((newWarehouse: Warehouse) => this.log(`deleted warehouse w/ description=${newWarehouse.description}`)),
      catchError(this.handleError<Warehouse>('addWarehouse')))
    
  }
  private log(message: string) {
    this.messageService.add(`WarehouseService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
