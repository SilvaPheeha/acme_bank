import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccountService } from '../account.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountsApiActions, AccountsPageActions } from './actions';

@Injectable()
export class AccountEffects {

  constructor(private actions$: Actions, private accountService: AccountService) { }

  loadAccounts$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AccountsPageActions.loadAccounts),
        mergeMap(() => this.accountService.getAccounts()
          .pipe(
            map(Accounts => AccountsApiActions.loadAccountsSuccess({ Accounts })),
            catchError(error => of(AccountsApiActions.loadAccountsFailure({ error })))
          )
        )
      );
  });

  updateAccount$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AccountsPageActions.updateAccount),
        concatMap((action) =>
          this.accountService.updateAccount(action.Account)
            .pipe(
              map(Trans => AccountsApiActions.updateAccountSuccess({ Account: Trans })),
              catchError(error => of(AccountsApiActions.updateAccountFailure({ error })))
            )
        )
      );
  });
}
