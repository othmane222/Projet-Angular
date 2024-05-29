import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone : true,
  imports : [FormsModule,CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: string[] = ['Others', 'Phones', 'Computers', 'Accessories','Cameras','Printers']; // Exemple de catégories
  selectedCategory: string = '';

  @Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Si vous avez un service pour obtenir les catégories, utilisez-le ici.
    // this.productService.getCategories().subscribe(data => {
    //   this.categories = data;
    // });
  }

    onCategoryChange(category: string): void {
      this.selectedCategory = category;
      this.categorySelected.emit(this.selectedCategory);
    }
}
