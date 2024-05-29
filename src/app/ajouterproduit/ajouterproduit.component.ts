import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { NgClass, NgFor, NgIf } from "@angular/common";

@Component({
  selector: 'app-ajouterproduit',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, JsonPipe, NgFor, NgIf, NgClass],
  templateUrl: './ajouterproduit.component.html',
  styleUrls: ['./ajouterproduit.component.css']
})
export class AjouterproduitComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService,private route:Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: '',
      brand: '',
      price: 0,
      category: '',
      description: '',
      imagePath: '',
      quantity:''
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        imagePath: file.name
      });
    }
  }

  onSubmit(): void {
    const product = this.form.value as Product;
    alert(product.imagePath);
    this.productService.addProduct(product)
      .subscribe(
        response => {
          console.log('Product added successfully', response);
          this.route.navigate(['/admin/products']);
        },
        error => {
          console.error('There was an error!', error);
        }
      );
  }
}
