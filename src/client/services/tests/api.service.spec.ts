import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Overlay} from '@angular/cdk/overlay';

import {ApiService} from '../api.service';
import {NotificationService} from '../notification.service';

describe('Api Service', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, NotificationService, Overlay]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be initialized', () => {
    expect(service).toBeDefined();
  });

  it('should call HTTP GET', () => {
    service.get('dummyUriTest').subscribe(response => {
      expect(response).toBeDefined();
      expect(response).toBe({});
    });

    const getRequest = httpMock.expectOne({method: 'GET', url: 'dummyUriTest'});
    getRequest.flush({});
  });
});
