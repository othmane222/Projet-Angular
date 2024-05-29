/*import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    JsonPipe
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  productFormGroup! : FormGroup;

  constructor(private fb : FormBuilder , public prodServise : ProductService) {
  }

  ngOnInit():void{
    this.productFormGroup=this.fb.group({
      name : this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      price : this.fb.control(null,[Validators.required,Validators.min(200)]),
      promotion : this.fb.control(false),
      description : this.fb.control(null,[Validators.required]),
      productImage: this.fb.control(null),
      quantity: this.fb.control(0,[Validators.required]),
    });
  }

  handelAddProduct() {
    //console.log(this.productFormGroup.value);
    let product = this.productFormGroup.value;
    this.prodServise.addNewProduct(product).subscribe({
      next:(data)=>{
        alert("Products added successfully");
        this.productFormGroup.reset();
        //this.router.Navigate
      },error:err => {
        console.log(err);
      }
    });
  }


}*/
