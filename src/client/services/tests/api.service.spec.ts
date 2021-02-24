import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Overlay} from '@angular/cdk/overlay';
import {HttpRequest} from '@angular/common/http';

import {ApiService} from '../api.service';
import {NotificationService} from '../notification.service';
import {dummySchema, dummySearchResult} from './api.service.mock';

describe.only('Api Service', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, Overlay, NotificationService]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function createDummyRequest(method: string, url: string) {
    return new HttpRequest(method, url, {responseType: 'json'});
  }

  it('should be initialized', () => {
    expect(service).toBeDefined();
  });

  it('should call HTTP GET', () => {
    const dummyUrl = 'dummySchema';
    service.get(dummyUrl).subscribe(response => {
      expect(response).toBeDefined();
      expect(response).toBe(dummySchema);
    });

    const requestMatch = createDummyRequest('GET', dummyUrl);
    const getRequest = httpMock.expectOne(requestMatch);
    getRequest.flush(dummySchema);
  });

  it('should call HTTP GET with null as URI', () => {
    const dummyUrl = null;
    service.get(dummyUrl).subscribe(response => {
      expect(response).toBeDefined();
      expect(response).toEqual(dummySchema);
    });

    const requestMatch = createDummyRequest('GET', dummyUrl);
    httpMock.expectNone(requestMatch);
  });

  it('should call POST method', () => {
    const dummyUrl = 'dummyPostUri';
    service.post(dummyUrl).subscribe(response => {
      expect(response).toBeDefined();
      expect(response).toEqual(dummySearchResult);
    });

    const requestMatch = createDummyRequest('POST', dummyUrl);
    const postRequest = httpMock.expectOne(requestMatch);
    postRequest.flush(dummySearchResult);
  });

});
