import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './account.component';
import { AccountState } from './state/account.reducer';

class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
}

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let store: Store<AccountState>;
  const initialState = {
    currentAccountNumber: '',
    Accounts: [
      {
        account_number: '6331103626640816',
        account_type: 'cheque',
        balance: '-296.65',
      },
      {
        account_number: '5248117462997084',
        account_type: 'savings',
        balance: '-20.00',
      },
    ],
    error: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [SharedModule],
      providers: [
        {
          provide: Store,
          useClass: StoreMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
