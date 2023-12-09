import { CepService } from './cep.service';
import { HttpClient } from '@angular/common/http';

describe('CepServiceService', () => {
  let service: CepService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CepService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
