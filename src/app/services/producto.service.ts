import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  url = 'http://localhost:3000/api/productos';
  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }
}
