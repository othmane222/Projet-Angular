import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';
import { UUID } from 'angular2-uuid';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products!: Array<Product>;

  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:9090/products/ps');
  }

  private baseUrl = 'http://localhost:9090/products';

  addProduct(product: Product): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log('Adding product:', product); // Log the product being added

    return this.http.post<Product>(`${this.baseUrl}/create`, JSON.stringify(product), httpOptions);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<number>(`${this.baseUrl}/${id}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}?category=${category}`);
  }
  

  public getPageProducts(page: number, size: number): Observable<PageProduct> {
    let index = page * size;
    let totalPages = Math.floor(this.products.length / size);
    if (this.products.length % size !== 0) totalPages++;
    let pageProducts = this.products.slice(index, index + size);
    return of({ page: page, size: size, totalPages: totalPages, products: pageProducts });
  }

  

 /* public setPromotion(id: number: Observable<boolean> {
    let product = this.products.find(p => p.id === id);
    if (product != undefined) {
      product.promotion = !product.promotion;
      return of(true);
    } else {
      return throwError(() => new Error('Product not found'));
    }
  }*/

  public searchProducts(keyword: string, page: number, size: number): Observable<PageProduct> {
    let result = this.products.filter(p => p.name.includes(keyword));
    let index = page * size;
    let totalPages = Math.floor(result.length / size);
    if (this.products.length % size !== 0) totalPages++;
    let pageProducts = result.slice(index, index + size);
    return of({ page: page, size: size, totalPages: totalPages, products: pageProducts });
  }

 /* public addNewProduct(product: Product): Observable<Product> {
    product.id = UUID.UUID();
    this.products.push(product);
    return of(product);
  }*/

  public getProduct(id: number): Observable<Product> {
    let product = this.products.find(p => p.id === id);
    if (product == undefined) return throwError(() => new Error('Product not found'));
    return of(product);
  }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  getErrorMessage(fieldname: string, error: any): string {
    if (error['required']) {
      return `${fieldname} is Required`;
    } else if (error['minlength']) {
      return `${fieldname} should have at least ${error['minlength']['requiredLength']} Characters`;
    } else if (error['min']) {
      return `${fieldname} should have a min value of ${error['min']['min']}`;
    } else {
      return '';
    }
  }

  /*public updateProduct(product: Product): Observable<Product> {
    this.products = this.products.map(p => (p.id === product.id) ? product : p);
    return of(product);
  }*/
}
