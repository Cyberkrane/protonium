import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/products.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public productsForm:FormGroup;

  constructor(
    public productsService: ProductsService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.productsForm = this.formBuilder.group({
      cantidad: [''],
      existencia:[''],
      nombre: [''],
      precio: [''],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('le diste click')
    this.productsService.createProducts(this.productsForm.value)
    this.router.navigate( [''] )
  }
}
