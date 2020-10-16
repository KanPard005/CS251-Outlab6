import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators'

import { Form } from './form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private getformUrl = 'https://cs251-outlab-6.herokuapp.com/initial_values/';
  private postformUrl =  'https://cs251-outlab-6.herokuapp.com/add_new_feedback/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getForm(): Observable<Form> {
    return this.http.get<Form>(this.getformUrl);
  }

  postForm(form: Form): Observable<Form> {
    return this.http.post<Form>(this.postformUrl, form, this.httpOptions).pipe(
      tap((postedForm: Form) => alert('Submitted successfully!')),
      catchError(this.handleError('onSubmit()', form))
    );
  }

  private handleError<T>(operation='operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      alert(error);
      return of(result as T);
    }
  }
}
