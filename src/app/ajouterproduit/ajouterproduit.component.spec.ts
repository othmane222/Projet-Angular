import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterproduitComponent } from './ajouterproduit.component';

describe('AjouterproduitComponent', () => {
  let component: AjouterproduitComponent;
  let fixture: ComponentFixture<AjouterproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterproduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
