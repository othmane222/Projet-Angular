import { Component } from '@angular/core';
import {CommonModule, JsonPipe, NgClass, NgFor, NgIf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {
  checkCustomElementSelectorForErrors
} from "@angular/compiler-cli/src/ngtsc/annotations/component/src/diagnostics";
import {Product} from "../model/product.model";
import { ProductsDetailsComponent } from '../products-details/products-details.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UUID} from "angular2-uuid";
import {AuthenticationService} from "../services/authentication.service";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import { CartService } from '../services/cart.service';
import { AjouterproduitComponent } from '../ajouterproduit/ajouterproduit.component';
import { ModifierProductComponent } from '../modifierproduct/modifierproduct.component';
import { CategoriesComponent } from "../categories/categories.component";
import { AdminTemplateComponent } from '../admin-template/admin-template.component';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    imports: [NgFor, NgIf, NgClass, ProductsDetailsComponent, ReactiveFormsModule, JsonPipe, RouterLink,
        RouterOutlet, FormsModule, CategoriesComponent,CommonModule]
})
export class ProductsComponent {
    
    products !: Array<Product>;
    currentPage : number=0;
    pageSize:number = 5;
    totalPages : number = 0;
    errorMessage !: string;
    searchFormGroup !: FormGroup;
    currentAction : string="all";
     cartItems: any[] = [];
     product : any;
     updatedProduct: any = {};
     editingProductId: number | null = null;
     categories: string[] = ['Others', 'Phones', 'Computers', 'Accessories','Cameras','Printers']; // Exemple de catégories
     selectedCategory: string = '';
     usernameActuel:string='';
  
    constructor(private productService : ProductService , private formBuilder : FormBuilder
            , public authService : AuthenticationService,private router : Router , private cartService: CartService,private admintemplate :AdminTemplateComponent
              ) {
                  this.searchFormGroup = this.formBuilder.group({
                    keyword: ['']
                  });
                  
    }
    ngOnInit(){
      this.usernameActuel = this.authService.usernameActuel;
      this.searchFormGroup=this.formBuilder.group({
        keyword : this.formBuilder.control(null)
      });
     // this.handleGetAllProducts();  pour affiche all products
     this.handleGetPageProducts();
     this.getProducts();
        console.log(this.usernameActuel +'🤣🤣')
     
    }



    getProducts(): void {
      this.productService.getProducts().subscribe(data => {
        this.products = data;
      });
    }
  
    deleteProduct(id: number): void {
      this.productService.deleteProduct(id).subscribe(
        deletedProductId => {
          this.products = this.products.filter(product => product.id !== deletedProductId);
        },
        error => {
          console.error(error);
        }
      );
    }



    editProduct(p:Product): void {
      this.router.navigate(['/admin/modifierproduct'], {
        queryParams: {
          id: p.id,
          name: p.name,
          brand: p.brand,
          category: p.category,
          price: p.price,
          description: p.description,
          imagePath: p.imagePath
        }
    });    }
  saveProduct(): void {
    if (this.editingProductId) {
      this.productService.updateProduct(this.editingProductId, this.updatedProduct).subscribe(
        response => {
          console.log('Product updated:', response);
          this.products = this.products.map(product => product.id === this.editingProductId ? response : product);
          this.cancelEdit();
        },
        error => {
          console.error('Update error:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.editingProductId = null;
    this.updatedProduct = {};
  }
    

  handleGetPageProducts(){
    
    this.productService.getAllProducts().subscribe({
      next : (d)=>{
      this.products=d;
      console.log(d);
      },
      error : (err)=>{
        this.errorMessage=err;
      }
    });
  }

    handleGetAllProducts(){
      this.productService.getAllProducts().subscribe({
        next : (data)=>{
          this.products = data;
        },
        error : (err)=>{
          this.errorMessage=err;
        }
      });
    }

  handelDeleteProduct(p: Product) {
      let conf=confirm("Are you sure?");
      if(conf == false) return;
    this.productService.deleteProduct(p.id).subscribe({
      next : (data)=>{
       // this.handleGetAllProducts();
        let index = this.products.indexOf(p);
        this.products.splice(index,1);
      }
    })

  }
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission
      this.handleSearchProducts(); // Manually trigger search on Enter key press
    }
  }


 /* hundleSetPromotion(p: Product) {

    let promo= p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next : (data)=>{
        p.promotion=!promo;
      },
      error : err =>{
        this.errorMessage=err;
      }
    })
  }*/

  toggleDescription(product: Product): void {
    product.showDescription = !product.showDescription;
  }
/*
  handleSearchProducts() {
      let keyword=this.searchFormGroup.value.keyword;
      this.productService.searchProducts(keyword).subscribe({
        next:(data)=>{
          this.products=data;
        }
      })
  }*/
  handleSearchProducts() {
    const keyword = this.searchFormGroup.get('keyword')?.value;
    // Here you can perform the search logic using the 'keyword'
    console.log('Searching for:', keyword);
  }
  
  


  gotoPage(i: number) {
    this.currentPage=i;
    if(this.currentAction=='all')
    this.handleGetPageProducts();
    else
      this.handleSearchProducts();
  }

  handleNewProduct() {
    this.router.navigateByUrl("/admin/newProduct")
  }

  handelEditProduct(p: Product) {
    this.router.navigateByUrl("/admin/editProduct/"+p.id);
  }


  //---------------------------cart----------------------------------------
  addToCart(item: Product) {
    --item.quantity!;
    this.productService.updateProduct(item.id,item).subscribe((product)=>{
      console.log("updaaated good 👌👌");
    });
    if (item) {
      const existingItem = this.cartItems.find(cartItem => cartItem.item.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push({ item, quantity: 1 });
      }
    } else {
      console.error('Error: Item is null or undefined.');
    }
  }

  removeFromCart(item: any) {
    const index = this.cartItems.findIndex(cartItem => cartItem.item.id === item.id);
    if (index !== -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        this.cartItems.splice(index, 1);
      }
    } else {
      console.error('Error: Item not found in cart.');
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0);
  }

  checkout() {
    // Implement checkout logic here, e.g., clear cart, process payment, etc.
    this.cartItems = [];
  }

  //---------category--------

  onCategorySelected(category: string): void {
    console.log(this.selectedCategory);
    this.selectedCategory = category;
    if (this.selectedCategory) {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe(data => {
        this.products = data;
      });
    } else {
      this.handleGetPageProducts();
    }
  }
  
}

