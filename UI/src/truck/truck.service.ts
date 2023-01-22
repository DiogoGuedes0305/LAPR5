import { ErrorHandler, Injectable } from '@angular/core';
import { Truck } from './truck';
import { TRUCKS } from './mockTruck';
import { MessageService } from '../messages/message.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { variables } from '../variables';
import { ContentObserver } from '@angular/cdk/observers';
@Injectable({
  providedIn: 'root',
})
export class TruckService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  

  private trucksURL = variables.NODE_URL + "/trucks"; //mudar para URL da api de node.


  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getTrucks(page: number, size: number): Observable<Truck[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Truck[]>(this.trucksURL,{params: params}).pipe(
      tap(_ => this.log('Fetched trucks')),
      catchError(this.handleError<Truck[]>('getTrucks', [])));
  }

  getActiveTrucks(page: number, size: number): Observable<Truck[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Truck[]>(this.trucksURL + "/activeTrucks", {params: params}).pipe(
      tap(_ => this.log('Fetched trucks')),
      catchError(this.handleError<Truck[]>('getActiveTrucks', [])));
  }


  getTruckByPlate(truckPlate: String): Observable<Truck> {

    const params = new HttpParams().set('truck.truckPlate', JSON.stringify(truckPlate));

    const headers = new HttpHeaders().set(' Content-type ','aplication/json ');

    return this.http.get<Truck>(this.trucksURL + "/truckPlate", {headers : headers, params : params}).pipe(
      tap(_ => this.log('Fetched truck')),
      catchError(this.handleError<Truck>('getTruckByPlate')));
  }
  


  private log(message: string) {
    this.messageService.add(`TruckService: ${message}`);
  }

  addTruck(truck: Truck): Observable<Truck> {
    return this.http.post<Truck>(this.trucksURL, truck, this.httpOptions).pipe(
      tap((newTruck: Truck) => this.log(`Added truck w/ plate=${newTruck.truckPlate}`)),
      catchError(this.handleError<Truck>('addTruck'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteTruck(truckPlate: string): Observable<any> {
    let deleteOptions =  {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body : {
        'truckPlate' : truckPlate
      }
    }

    return this.http.delete<Truck>(this.trucksURL, deleteOptions).pipe(
      tap(_ => this.log(`Deleted truck plate=${truckPlate}`)),
      catchError(this.handleError<Truck>('deleteTruck'))
    );
  }

  deactivateActivate(truckPlate: string): Observable<any> {
    const body = { truckPlate };
    const deactivateActivateOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.request<Boolean>('PATCH', this.trucksURL, { body, ...deactivateActivateOptions }).pipe(
      tap(_ => this.log(`Changed truck status with plate =${truckPlate}`)),
      catchError(this.handleError<Boolean>('Deactivate or Activate a Truck'))
    );
  }


  
  updateTruck(truck: Truck): Observable<any> {
    return this.http.put(this.trucksURL, truck, this.httpOptions).pipe(
      tap(_ => this.log(`Updated truck plate=${truck.truckPlate}`)),
      catchError(this.handleError<any>('updateHero'))
    );
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
