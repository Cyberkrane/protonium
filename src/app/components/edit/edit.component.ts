import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/products.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public editForm: FormGroup
  productsRef: any

  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      cantidad: [''],
      existencia: [''],
      nombre: [''],
      precio: [''],
    })
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.productsService.getProductsById(id!).subscribe(res => {
      this.productsRef = res
      this.editForm = this.formBuilder.group({
        cantidad: [this.productsRef.cantidad],
        existencia: [this.productsRef.existencia],
        nombre: [this.productsRef.nombre],
        precio: [this.productsRef.precio]
      })
    })
    console.log(id)
  }

  onSubmit(){
    const id = this.activeRoute.snapshot.paramMap.get('id')
    this.productsService.updateProducts(this.editForm.value, id!)
    this.router.navigate([''])
  }
}
