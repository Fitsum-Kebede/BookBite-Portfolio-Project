import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {

  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Simulated API endpoint for reservations
  private reservationsUrl = `${this.baseUrl}/reservations`;
  private reservationsUrl2 = `${this.baseUrl}/comment`;
  private numberOfSitsAvaUrl = `${this.baseUrl}/totalAvailableSits`;
  private numberOfReservedTabelDateUrl = `${this.baseUrl}/reservedTableDates`;

  // Get all reservation data
  getReservations(): Observable<any> {
    return this.http
      .get<any>(this.reservationsUrl)
      .pipe(catchError(this.handleError<any>('Get Reserved Data')));
  }
  getReservations2(): Observable<any> {
    return this.http
      .get<any>(this.reservationsUrl2)
      .pipe(catchError(this.handleError<any>('Get Reserved Data')));
  }
  // Get only one reservation data
  getReservationById(id: number): Observable<any> {
    return this.http
      .get<any>(this.reservationsUrl + `/${id}`)
      .pipe(catchError(this.handleError<any>('Get Reserved Data')));
  }

  // Create a new reservation
  createReservation(reservation: any): Observable<any> {
    return this.http
      .post<any>(this.reservationsUrl, reservation)
      .pipe(catchError(this.handleError<any>('Create Reservation')));
  }
  createReservationcomment(comment: any): Observable<any> {
    return this.http
      .post<any>(this.reservationsUrl2, comment)
      .pipe(catchError(this.handleError<any>('Create Reservation')));
  }
  // Delete reservation
  deleteReservation(id: number): Observable<any> {
    return this.http
      .delete<any>(this.reservationsUrl + `/${id}`)
      .pipe(catchError(this.handleError<any>('Delete Reservation')));
  }

  // Update Reserved Table Status
  updateReservedTableStatus(
    ReservedTableStatus: any,
    id: number
  ): Observable<any> {
    return this.http
      .put<any>(this.reservationsUrl + `/${id}`, ReservedTableStatus)
      .pipe(catchError(this.handleError<any>('Update Reserved Table Status')));
  }

  // Get a Total Number Of Sits
  getTotalNumberOfSits(): Observable<any> {
    return this.http
      .get<any>(this.numberOfSitsAvaUrl)
      .pipe(
        catchError(this.handleError<any>('Total Number Of Sits Available'))
      );
  }

  // Get a Total Number Of Sits
  getNumberOfReservedTables(): Observable<any> {
    return this.http
      .get<any>(this.numberOfReservedTabelDateUrl)
      .pipe(
        catchError(
          this.handleError<any>('Get Number Of Reserved Table with Date')
        )
      );
  }

  // Create New Of Table
  createNewTable(createNewTable: any): Observable<any> {
    return this.http
      .post<any>(this.numberOfReservedTabelDateUrl, createNewTable)
      .pipe(catchError(this.handleError<any>('Create New Table with Date')));
  }

  // Update Number Of Reserved Table
  updateNumberOfReservedTable(
    numberOfTableReserved: any,
    id: number | undefined
  ): Observable<any> {
    return this.http
      .put<any>(
        this.numberOfReservedTabelDateUrl + `/${id}`,
        numberOfTableReserved
      )
      .pipe(
        catchError(
          this.handleError<any>('Update Number Of Table Reserved with Date')
        )
      );
  }

  // Delete Number Of Reserved Table
  deleteReservedTableData(id: number): Observable<any> {
    return this.http
      .delete<any>(this.numberOfReservedTabelDateUrl + `/${id}`)
      .pipe(
        catchError(this.handleError<any>('Delete Number Of Reserved Table'))
      );
  }

  // Handle errors in API requests
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
