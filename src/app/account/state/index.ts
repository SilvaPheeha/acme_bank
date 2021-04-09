import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from './account.reducer';

// TODO app state, move to own folder
export interface State {
  Accounts: AccountState;
}

const getAccountFeatureState = createFeatureSelector<AccountState>('accounts');

export const getCurrentAccountNumber = createSelector(
  getAccountFeatureState,
  (state) => state.currentAccountNumber
);

export const getCurrentAccount = createSelector(
  getAccountFeatureState,
  getCurrentAccountNumber,
  (state, currentAccountNumber) => {
    if (currentAccountNumber === '') {
      return {
        account_number: '',
        account_type: '',
        balance: '',
      };
    } else {
      return currentAccountNumber
        ? state.Accounts.find((a) => a.account_number === currentAccountNumber)
        : null;
    }
  }
);

export const getAccounts = createSelector(
  getAccountFeatureState,
  (state) => state.Accounts
);

export const getError = createSelector(
  getAccountFeatureState,
  (state) => state.error
);
