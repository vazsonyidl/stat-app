import {inject, TestBed} from '@angular/core/testing';
import {HttpRequest} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {ApiService} from '../api.service';
import {NotificationService} from '../notification.service';
import {dummySchema, dummySearchResult} from './mocks/api.service.mock';

class MockNotificationService {
  displayNotification = () => {
    return 'Mock';
  };
}

describe('Api Service', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        {
          provide: NotificationService, useClass: MockNotificationService
        }
      ]
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

  it('should be initialized', inject([NotificationService], (notifService: MockNotificationService) => {
    expect(service).toBeDefined();
    expect(notifService instanceof MockNotificationService).toBeTruthy();
  }));

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
    service.get(dummyUrl).subscribe();

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

  it('should error POST method', inject([NotificationService], (notifService: MockNotificationService) => {
    const dummyUrl = 'dummyPostUri';
    service.post(dummyUrl).subscribe();

    const notifServiceSpy = jest.spyOn(notifService, 'displayNotification');

    const requestMatch = createDummyRequest('POST', dummyUrl);
    const postRequest = httpMock.expectOne(requestMatch);
    postRequest.error({} as any);

    expect(notifServiceSpy).toBeCalledTimes(1);
  }));

  it('POST method should handle null', inject([NotificationService], (notifService: MockNotificationService) => {
    const dummyUrl = null;
    service.post(dummyUrl, undefined).subscribe();
    const notifServiceSpy = jest.spyOn(notifService, 'displayNotification');

    const requestMatch = createDummyRequest('POST', dummyUrl);
    httpMock.expectNone(requestMatch);
    expect(notifServiceSpy).not.toHaveBeenCalled();
  }));
});
