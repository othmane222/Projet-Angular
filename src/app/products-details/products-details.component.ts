import {Component, Input} from '@angular/core';
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css'
})
export class ProductsDetailsComponent {
  @Input() product: Product | undefined;
}
