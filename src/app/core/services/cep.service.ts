import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Address from '../models/address';
import { HttpClient } from '@angular/common/http';
import AddressResponse from './response/addres-response';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient) {}

  public searchBy(zipcode: string): Observable<Address> {
    return this.http
      .get<AddressResponse>(`https://viacep.com.br/ws/${zipcode}/json/`)
      .pipe(
        map(
          (r) =>
            ({
              zipcode: r.cep,
              street: r.logradouro,
              neighborhood: r.bairro,
            }) as Address,
        ),
      );
  }
}
