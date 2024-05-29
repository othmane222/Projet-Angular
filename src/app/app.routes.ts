import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AjouterproduitComponent } from './ajouterproduit/ajouterproduit.component';
import { ModifierProductComponent } from './modifierproduct/modifierproduct.component';
import { CategoriesComponent } from './categories/categories.component';
import { InscriptionComponent } from './inscription/inscription.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  {
    path: 'admin',
    component: AdminTemplateComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: 'ajouterproduit', component: AjouterproduitComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'modifierproduct', component: ModifierProductComponent },
      { path: 'categories', component: CategoriesComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
