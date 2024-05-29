import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierProductComponent } from './modifierproduct.component';

describe('ModifierproductComponent', () => {
  let component: ModifierProductComponent;
  let fixture: ComponentFixture<ModifierProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
