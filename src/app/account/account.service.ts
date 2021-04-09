import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Account } from '../models/account';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.accountsUrl}`).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError((e) => throwError(e))
    );
  }

  updateAccount(Trans: Account): Observable<Account> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${environment.accountsUrl}/${Trans.account_number}`;
    return this.http
      .put<Account>(url, Trans, { headers })
      .pipe(
        tap(() => console.log('Updated Account: ' + Trans.account_number)),
        map(() => Trans),
        catchError((e) => throwError(e))
      );
  }
}
