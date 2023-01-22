import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'messages/message.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { variables } from 'variables';
import { Path } from './path';

@Injectable({
  providedIn: 'root',
})
export class PathService {
  private pathURL = variables.NODE_URL + '/path';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };


  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getPaths(page: number, size: number): Observable<Path[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Path[]>(this.pathURL, {params:params}).pipe(
      tap((_) => this.log('Fetched paths')),
      catchError(this.handleError<Path[]>('getPath', []))
    );
  }

  addPath(path: {
    distance: any;
    time: any;
    extraTime: any;
    energyExpended: any;
    warehouseDeparture: any;
    warehouseArrival: any;
  }): Observable<Path> {
    return this.http.post<Path>(this.pathURL, path, this.httpOptions).pipe(
      tap((newPath: Path) => this.log(`Added path`)),
      catchError(this.handleError<Path>('addTruck'))
    );
  }

  private log(message: string) {
    this.messageService.add(`Path Service: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      alert(error.message);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
