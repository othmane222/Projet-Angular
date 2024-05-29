import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product.model';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-modifierproduct',
  standalone: true,
  templateUrl: './modifierproduct.component.html',
  styleUrls: ['./modifierproduct.component.css'],
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ModifierProductComponent implements OnInit {
  produit:Product|undefined;
  form!: FormGroup;
i:number=0;
editProduct() {
  this.i=this.product.id;
  this.product=this.editForm?.value;
  this.produit=this.editForm!.value as Product;
  this.produit.id=this.i;

  console.log(this.produit.id+"mmmmmmmmmmmmmm " +this.product.id)
  this.productService.updateProduct(this.i,this.produit).subscribe(
    ()=>{
      console.log('updqted');
      this.router.navigateByUrl("/admin/products");

    }
  );
}
onFileChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.form.patchValue({
      imagePath: file.name
    });
  }
}
  editForm: FormGroup|undefined;
  productId!: number;
  product!: { 
    id: number, 
    name: string, 
    brand: string,
    category: string, 
    price: number, 
    description: string, 
    imagePath: string 
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.product = {
        id: params['id'],
        name: params['name'],
        brand: params['brand'],
        category: params['category'],
        price: params['price'],
        description: params['description'],
        imagePath: params['imagePath']
      };

      // Initialize the form group after product is set
      this.editForm = this.fb.group({
        name: [this.product.name || ''],
        brand: [this.product.brand || ''],
        category: [this.product.category || ''],
        price: [this.product.price || 0],
        description: [this.product.description || ''],
        imagePath: [this.product.imagePath || '']
      });
    });
  }

  saveProduct(): void {
    this.productService.updateProduct(this.product.id, this.editForm!.value).subscribe(
      () => {
        this.router.navigate(['/products']);
      },
      error => {
        console.error('Update error:', error);
      }
    );
  }
}
