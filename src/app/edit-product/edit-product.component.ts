/*import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
      productId !: string;
      product! : Product;
      productFormGroup! : FormGroup;
      constructor(private route : ActivatedRoute, public prodService : ProductService,
                  private  fb : FormBuilder) {
        this.productId =this.route.snapshot.params['id'];
      }

      ngOnInit():void{
        this.prodService.getProduct(this.productId).subscribe({
          next:(product)=>{
            this.product=product;
            this.productFormGroup=this.fb.group({
              name : this.fb.control(this.product.name,[Validators.required,Validators.minLength(4)]),
              price : this.fb.control(this.product.price,[Validators.required,Validators.min(200)]),
              promotion : this.fb.control(this.product.promotion),
              description : this.fb.control(this.product.description,[Validators.required]),
              productImage: this.fb.control(this.product.imagePath),
              quantity: this.fb.control(this.product.quantity,[Validators.required]),
            });

          },
          error:(err)=>{
            console.log(err);
          }
        });
      }

  handelUpdateProduct() {
   let p =this.productFormGroup.value;
   p.id = this.product.id;
   this.prodService.updateProduct(p).subscribe({
     next:()=>{
       alert("Product Updated successfully")
     },
     error : err =>{
       console.log(err);
     }
   })
  }


}*/
