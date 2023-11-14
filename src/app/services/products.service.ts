import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //apiBaseUrl: string = 'https://dummyjson.com/products';
  apiBaseUrl: string = 'https://dummyjson.com';

  constructor(
    private http : HttpClient
  ) { }
  

  getAllProducts():Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/products');
  } 
}
