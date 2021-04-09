import { Account } from '../../models/account';
import { AccountsApiActions } from './actions';
import { createReducer, on } from '@ngrx/store';

export interface AccountState {
  currentAccountNumber: string;
  Accounts: Account[];
  error: any;
}

const initialState: AccountState = {
  currentAccountNumber: '',
  Accounts: [],
  error: '',
};

export const AccountReducer = createReducer<AccountState>(
  initialState,
  on(
    AccountsApiActions.loadAccountsSuccess,
    (state, action): AccountState => {
      return {
        ...state,
        Accounts: action.Accounts,
        error: '',
      };
    }
  ),
  on(
    AccountsApiActions.loadAccountsFailure,
    (state, action): AccountState => {
      return {
        ...state,
        Accounts: [],
        error: action.error,
      };
    }
  ),
  on(
    AccountsApiActions.updateAccountSuccess,
    (state, action): AccountState => {
      const updatedAccounts = state.Accounts.map((item) =>
        action.Account.account_number === item.account_number
          ? action.Account
          : item
      );
      return {
        ...state,
        Accounts: updatedAccounts,
        currentAccountNumber: action.Account.account_number,
        error: '',
      };
    }
  ),
  on(
    AccountsApiActions.updateAccountFailure,
    (state, action): AccountState => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);
