import { Account } from '../../../models/account';
import { createAction, props } from '@ngrx/store';

export const loadAccounts = createAction('[Account Page] Load');

export const updateAccount = createAction(
  '[Account Page] Update Account',
  props<{ Account: Account }>()
);
