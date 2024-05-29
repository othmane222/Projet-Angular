import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {AuthenticationService} from "../services/authentication.service";
import {Route, Router} from "@angular/router";
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
inscription() {
this.router.navigateByUrl('/inscription');}
userFormGroup !: FormGroup;
errorMassage : any;

constructor(private fb : FormBuilder, private authService : AuthenticationService,
            private router : Router) {
}

ngOnInit(){
  this.userFormGroup=this.fb.group({
    username : this.fb.control("aa"),
  password : this.fb.control("aa")
  });
}

  handleLogin() {
      let username = this.userFormGroup.value.username;
      let  password = this.userFormGroup.value.password;
      this.authService.login(username,password).subscribe({
        next:(appUer)=>{
          this.authService.authenticateUser(appUer).subscribe({
            next : ()=>{
              this.authService.usernameActuel=username;
              this.router.navigate(['/home']);
            }
          });
        },
        error:(err)=>{
          this.errorMassage = err;
        }
      });
  }
}
