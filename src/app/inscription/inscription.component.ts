import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import {User} from "../model/product.model";
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  userFormGroup !: FormGroup;
  errorMassage : any;
  
  user:User|undefined;
  
  constructor(private fb : FormBuilder, private authService : AuthServiceService,
              private router : Router) {
  }
  
  ngOnInit(){
    this.userFormGroup=this.fb.group({
      username : ['',Validators.required],
    password : ['',Validators.required],
    email :['',Validators.required],
    address : ['',Validators.required]
    });
  }
  
  login() {
    this.router.navigateByUrl('');}
    addUser(){
      this.user=this.userFormGroup.value;
     this.user!.role="Add";
     

     this.authService.addProduct(this.user!).subscribe((user)=>{
        console.log('Addeed👌👌👌')
      })
    }
}
