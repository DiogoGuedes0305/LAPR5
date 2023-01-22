import { ErrorHandler, Injectable } from '@angular/core';
import { Delivery } from './delivery';
import { MessageService } from '../messages/message.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private deliveriesURL = 'https://localhost:5001/api/Deliveries'; 


  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.deliveriesURL).pipe(
      tap(_ => this.log('Fetched deliveries')),
      catchError(this.handleError<Delivery[]>('getDeliveries', [])));
  }


  private log(message: string) {
    this.messageService.add(`DeliveryService: ${message}`);
  }

  addDelivery(delivery: Delivery): Observable<Delivery> {
    console.log(delivery);
    return this.http.post<Delivery>(this.deliveriesURL, delivery, this.httpOptions).pipe(
      tap((newDelivery: Delivery) => this.log(`Added delivery`)),
      catchError(this.handleError<Delivery>('addDelivery'))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
