import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { Account } from '../models/account';
import { getAccounts, getCurrentAccount, getError, State } from './state';
import { AccountsPageActions } from './state/actions';

export const SAVINGS_DISABLER = -20;
export const CHEQUE_DISABLER = -500;

export enum AccountType {
  cheque = 'cheque',
  savings = 'savings',
}

@Component({
  selector: 'acme-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  errorMessage$: Observable<any>;
  accounts$: Observable<Account[]>;
  balance = 0;
  selectedAccount$: Observable<Account | null | undefined>;
  constructor(private store: Store<State>, private modalService: NgbModal) {}

  ngOnInit(): void {
    // this.store.dispatch(AccountsPageActions.loadAccounts());
    this.accounts$ = this.store.select(getAccounts);
    this.errorMessage$ = this.store.select(getError);
    this.selectedAccount$ = this.store.select(getCurrentAccount);
    this.accounts$.pipe(map((acc) => acc.map((a) => +a.balance))).subscribe({
      next: (b) => this.balance = b.reduce((prev, curr) => prev + curr, 0),
    });
  }

  canWithdraw(acc: Account): boolean {
    switch (acc.accountType) {
      case AccountType.cheque:
        return +acc.balance <= CHEQUE_DISABLER;
      case AccountType.savings:
        return +acc.balance <= SAVINGS_DISABLER;
      default:
        return false;
    }
  }

  open(content: any): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-withdraw'});
  }
}
