import { Account } from '../../../models/account';
import { createAction, props } from '@ngrx/store';

export const loadAccountsSuccess = createAction(
    '[Account API] Load Success',
    props<{ Accounts: Account[] }>()
);

export const loadAccountsFailure = createAction(
    '[Account API] Load Fail',
    props<{ error: string }>()
);

export const updateAccountSuccess = createAction(
    '[Account API] Update Account Success',
    props<{ Account: Account }>()
);

export const updateAccountFailure = createAction(
    '[Account API] Update Account Fail',
    props<{ error: string }>()
);
