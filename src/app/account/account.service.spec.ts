import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';

import { AccountService } from './account.service';

describe('AccountService', () => {
  let testBed: TestBed;
  let service: AccountService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService],
    });
    testBed = getTestBed();
    service = testBed.inject(AccountService);
    httpMock = testBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be retrieve accounts', () => {
    const accounts: Account[] = [
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
    ];
    service.getAccounts().subscribe((acc) => {
      expect(acc.length).toBe(2);
    });

    const httpReq = httpMock.expectOne(`${environment.accountsUrl}`);
    expect(httpReq.request.method).toBe('GET');
    httpReq.flush(accounts);
  });
});
